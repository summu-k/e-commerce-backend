const express = require('express');
const app = express();
const pool = require('pool');

app.listen(3005, () => {
  console.log('server running on 3005 ');
});
