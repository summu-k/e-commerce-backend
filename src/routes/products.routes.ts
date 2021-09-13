const upload = require('../config/multer');

module.exports = (app: { use: (arg0: string, arg1: any) => void }) => {
  const products = require('../controllers/products.controller');

  var router = require('express').Router();
  // products routes
  router.post('/updateProduct/:id', products.updateProduct);
  router.post('/upload', products.uploadProductImage);
  router.post(
    '/uploadSingle',
    upload.single('image'),
    products.singleUploadFile
  );
  app.use('/api/products', router);
};
