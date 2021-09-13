"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_model_1 = __importDefault(require("../models/products.model"));
const next_connect_1 = __importDefault(require("next-connect"));
// import multer from 'multer';
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
const handler = next_connect_1.default();
// const upload = multer();
const upload = require('../config/multer');
// Find a single Product and update
exports.updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const product = yield products_model_1.default.findOne({ where: { id } });
    console.log('req.body file ');
    console.log(req.body);
    const { images, product_name, brand, sale_price, discount, rating } = req.body;
    if (product) {
        product.images = [images];
        product.brand = brand;
        product.product_name = product_name;
        product.sale_price = sale_price;
        product.discount = discount;
        product.rating = rating;
        yield product.save();
    }
    else {
        res.status(404).send({ message: 'Product not found' });
    }
    res.send({ message: 'Product Updated Successfully' });
});
exports.uploadProductImage = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req ori ');
    handler
        .use(upload.single('file'))
        .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('response ');
        console.log(req);
        console.log('req file ');
        console.log(req.file);
        const streamUpload = (request) => {
            console.log('response inside');
            console.log(request);
            console.log('request file inside ');
            console.log(request.file);
            console.log('request file buffer inside ');
            console.log(request.file.buffer);
            return new Promise((resolve, reject) => {
                const stream = cloudinary_1.v2.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    }
                    else {
                        reject(error);
                    }
                });
                console.log('stream streamUpload');
                console.log(stream);
                streamifier_1.default.createReadStream(request.file.buffer).pipe(stream);
            });
        };
        const result = yield streamUpload(req);
        console.log('result upload ');
        console.log(result);
        res.send(result);
    }));
});
exports.singleUploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.file);
    const file = req.files.photo;
    console.log(file);
    const uploader = (file) => {
        return new Promise(function (resolve, reject) {
            cloudinary_1.v2.uploader.upload(file.tempFilePath, (err, result) => {
                console.log(result);
                if (result) {
                    resolve(result);
                }
                else {
                    reject(err);
                }
            });
        });
    };
    var data = yield uploader(file);
    res.send(data);
});
