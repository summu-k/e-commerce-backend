import express, { json } from 'express';
const app = express();
// import pool from './db';
const pool = require('./db');

app.use(express.json());

//GET api get all products
app.get('/products', async (req, res) => {
  try {
    const getAllProducts = await pool.query('SELECT * FROM products');
    res.json(getAllProducts.rows);
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

app.put('/products', async (req: requestProps, res) => {
  try {
    if (req.params && req.params.id && typeof req.params.id === 'string') {
    }

    const { id } = req.params;
    const { image_url, description, title, price } = req.body;
    const updateProduct = await pool.query(
      'UPDATE products set image_url=$1,description=$2,title=$3,price=$4 WHERE id=$5',
      [image_url, description, title, price, id]
    );
    res
  } catch (error) {
    console.error(error);
  }
});

app.listen(3005, () => {
  console.log('server running on 3005 ');
});
