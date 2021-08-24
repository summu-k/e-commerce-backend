import express, { json } from 'express';
const app = express();
import cors from 'cors';
const pool = require('./db');
const PORT = process.env.PORT || 3005;

//middleware
app.use(cors());
app.use(express.json());

interface responseProps {
  info: {
    count?: number;
    page?: number;
    next?: string;
    prev?: string;
  };
  results: Array<any>;
}

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
      'select *, count(*) OVER() AS total_count FROM product_data order by id limit $1 offset $2',
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
    image_url: string;
    description: string;
    title: string;
    price: number;
  };
}

app.put('/products/:id', async (req: requestProps, res) => {
  try {
    const { id } = req.params;
    const { image_url, description, title, price } = req.body;
    await pool.query(
      'UPDATE products set image_url=$1,description=$2,title=$3,price=$4 WHERE id=$5',
      [image_url, description, title, price, id]
    );
    res.json('Record was updated successfully');
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT} `);
});
