import express from 'express';
const app = express();
import pool from './db';

app.use(express.json());


//create a post api for products table

app.post('/products', async (req, res) => {
    
})

app.listen(3005, () => {
  console.log('server running on 3005 ');
});
