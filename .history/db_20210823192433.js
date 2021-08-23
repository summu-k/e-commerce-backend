const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  password: '',
  database: 'ecommerce',
  
});