const express = require('express');
const app = express();
const pool = require('./db');

app.listen(3005, () => {
  console.log('server running on 3005 ');
});
