const Pool = require('pg').Pool;
require('dotenv').config();

// const devConfig = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DATABASE,
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT,
// };

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const prodConfig = process.env.DATABASE_URL;

const pool = (() => {
  if (process.env.NODE_ENV !== 'production') {
    return new Pool({
      connectionString: devConfig,
      ssl: false,
    });
  } else {
    return new Pool({
      connectionString: prodConfig,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }
})();

module.exports = pool;
