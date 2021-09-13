import Products from '../models/products.model';
import { Request, Response } from 'express';
import nextConnect from 'next-connect';
import { isAuth, isAdmin } from '../utils/auth';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = nextConnect();
const upload = require('../config/multer');

// Find a single Product and update
exports.updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product: any = await Products.findOne({ where: { id } });
  console.log('req.body file ');
  console.log(req.body);
  const { images, product_name, brand, sale_price, discount, rating } =
    req.body;
  if (product) {
    product.images = [images];
    product.brand = brand;
    product.product_name = product_name;
    product.sale_price = sale_price;
    product.discount = discount;
    product.rating = rating;
    await product.save();
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
  res.send({ message: 'Product Updated Successfully' });
};

interface MulterRequest extends Request {
  files: {
    photo: any;
  };
}

exports.singleUploadFile = async (
  req: MulterRequest,
  res: Response
): Promise<any> => {
  const file = req.files.photo;
  const uploader = (file: any) => {
    return new Promise(function (resolve, reject) {
      cloudinary.uploader.upload(file.tempFilePath, (err: any, result: any) => {
        console.log(result);
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  };

  var data = await uploader(file);
  res.send(data);
};
