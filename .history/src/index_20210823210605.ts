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
  } catch {
    
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
  } catch (err) {
    console.log(err);
  }
});

app.listen(3005, () => {
  console.log('server running on 3005 ');
});
