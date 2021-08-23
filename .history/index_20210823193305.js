import express from 'express';
const app = express();
import pool from './db';

app.use(express.json());


//create a 

app.listen(3005, () => {
  console.log('server running on 3005 ');
});
