import express from 'express';
import { ProductMapProps } from './utils/interface';
import { responseProps } from './utils/interface';
const app = express();
const fileUpload = require('express-fileupload');
import { Request, Response } from 'express';
import cors from 'cors';
const pool = require('./db');
const PORT = process.env.PORT || 3005;
import { Client } from '@elastic/elasticsearch';
import { sequelize } from './database';
const elasticClient = new Client({ node: 'http://localhost:9200' });

//middleware
const corsOptions = {
  origin:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000'
      : 'https://e-commerce-backend-express.herokuapp.com',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// const db = require('./models');
// db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.');
// });

require('./routes/users.routes')(app);
require('./routes/products.routes')(app);

app.get('/products/search/', async (req, res) => {
  let resultObject: responseProps = { info: {}, results: [] };

  try {
    const { brand, priceRange, offset, limit } = req.query;
    let priceQuery = '';
    let brandQuery = '';
    let query = '';
    let productQuery =
      'select *, count(*) OVER() AS total_count from product_data';

    if (priceRange && typeof priceRange === 'string') {
      const price = priceRange.split('-');
      priceQuery = `sale_price between ${price[0]} and ${price[1]}`;
    }

    if (brand && typeof brand === 'string') {
      brandQuery = `brand='${brand}'`;
    }

    if (priceQuery || brandQuery) {
      if (priceQuery && !brandQuery) {
        query += `${priceQuery}`;
      }
      if (brandQuery && !priceQuery) {
        query += `${brandQuery}`;
      }
      if (brandQuery && priceQuery) {
        query += `${brandQuery} and ${priceQuery}`;
      }
      productQuery += ` where ${query}`;
    }

    const products = await pool.query(`${productQuery} limit $1 offset $2`, [
      limit,
      offset,
    ]);

    resultObject.info = {
      count: products.rows.length ? products.rows[0].total_count : 0,
    };
    resultObject.results = products.rows;
    res.json(resultObject);
  } catch (error) {
    console.error(error);
  }
});

app.get('/products/brands/', async (req, res) => {
  let resultObject: responseProps = { info: {}, results: [] };

  try {
    const { brand, limit, offset } = req.query;
    const products = await pool.query(
      'select *, count(*) OVER() AS total_count from product_data WHERE brand=$1 limit $2 offset $3',
      [brand, limit, offset]
    );
    resultObject.info = {
      count: products.rows[0].total_count,
    };
    resultObject.results = products.rows;
    res.json(resultObject);
  } catch (error) {
    console.error(error);
  }
});

app.get('/products/:id', async (req: requestProps, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await pool.query(
      'select * from product_data WHERE id=$1',
      [id]
    );
    res.json(singleProduct.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

//GET api get all products
app.get('/products', async (req, res) => {
  let resultObject: responseProps = { info: {}, results: [] };
  const { page } = req.query;
  let offset = 0;
  let next = '';
  let prev = '';
  if (page) {
    offset = (+page - 1) * 20;
  }
  try {
    const getAllProducts = await pool.query(
      'select *, count(*) OVER() AS total_count from product_data order by id limit $1 offset $2',
      [20, offset]
    );

    if (page && +page === 1) {
      next = `/products?page=${+page + 1}`;
    } else if (page && +page !== 1) {
      next = `/products?page=${+page + 1}`;
      prev = `/products?page=${+page - 1}`;
    }

    resultObject.info = {
      count: getAllProducts.rows[0].total_count,
      page: Math.ceil(getAllProducts.rows[0].total_count / 20),
      next,
      prev,
    };
    resultObject.results = getAllProducts.rows;
    res.json(resultObject);
  } catch (error) {
    console.error(error);
  }
});

//create a post api for products table
app.post('/products', async (req, res) => {
  try {
    const { image_url, description, title, price } = req.body;
    const newProduct = await pool.query(
      'INSERT INTO products (image_url, description, title, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [image_url, description, title, price]
    );
    res.json(newProduct.rows);
  } catch (error) {
    console.error(error);
  }
});

// update api to update products
interface requestProps {
  params: {
    id: number;
  };
  body: {
    images: string;
    description?: string;
    product_name: string;
    brand: string;
    sale_price: number;
    discount: number;
    rating: number;
  };
}

app.put('/products/:id', async (req: requestProps, res) => {
  try {
    const { id } = req.params;
    const { images, product_name, brand, sale_price, discount, rating } =
      req.body;
    await pool.query(
      'UPDATE product_data set images=jsonb_set(images,$1),product_name=$2,brand=$3,sale_price=$4,discount=$5,rating=$6 WHERE id=$7',
      [[images], product_name, brand, sale_price, discount, rating, id]
    );
    res.json('Record was updated successfully');
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT} `);
  sequelize
    .authenticate()
    .then(async () => {
      console.log('database connected');
      // try {
      //   await sequelize.sync({ force: true });
      // } catch (error) {
      //   console.log(error.message);
      // }
    })
    .catch((e: any) => {
      console.log(e.message);
    });
});

//GET api get all products
app.get('/populateIndex', async (req, res) => {
  let resultObject: responseProps = { results: [] };
  try {
    const getAllProducts = await pool.query(
      'select *, count(*) OVER() AS total_count from product_data order by id'
    );

    if (getAllProducts.rows.length) {
      elasticBulk(getAllProducts.rows).catch(console.log);
    }
    res.json('Elastic index has been populated');
  } catch (error) {
    console.error(error);
  }
});

app.post('/uploadImage', async (req, res) => {
  console.log('req.body ');
  console.log(req.body);
  const file = req.files;
  console.log('file real ');
  console.log(file);
});

async function elasticBulk(rows: ProductMapProps[]) {
  const body = rows.flatMap((doc, index) => [
    { index: { _index: 'product_data', _id: index + 1 } },
    {
      product_name: doc.product_name,
      product_id: doc.product_id,
      brand: doc.brand,
      description: doc.description,
      images: doc.images,
    },
  ]);
  await elasticClient.bulk({ body: body, refresh: true });
}
