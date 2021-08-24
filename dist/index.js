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
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const cors_1 = __importDefault(require("cors"));
const pool = require('./db');
const PORT = process.env.PORT || 3005;
//middleware
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors_1.default(corsOptions));
app.use(express_1.default.json());
app.get('/products/brands/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resultObject = { info: {}, results: [] };
    try {
        const { brand, limit, offset } = req.query;
        const products = yield pool.query('select *, count(*) OVER() AS total_count from product_data WHERE brand=$1 limit $2 offset $3', [brand, limit, offset]);
        resultObject.info = {
            count: products.rows[0].total_count,
        };
        resultObject.results = products.rows;
        res.json(resultObject);
    }
    catch (error) {
        console.error(error);
    }
}));
app.get('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const singleProduct = yield pool.query('select * from product_data WHERE id=$1', [id]);
        res.json(singleProduct.rows[0]);
    }
    catch (error) {
        console.error(error);
    }
}));
//GET api get all products
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let resultObject = { info: {}, results: [] };
    const { page } = req.query;
    let offset = 0;
    let next = '';
    let prev = '';
    if (page) {
        offset = (+page - 1) * 20;
    }
    try {
        const getAllProducts = yield pool.query('select *, count(*) OVER() AS total_count from product_data order by id limit $1 offset $2', [20, offset]);
        if (page && +page === 1) {
            next = `/products?page=${+page + 1}`;
        }
        else if (page && +page !== 1) {
            next = `/products?page=${+page + 1}`;
            prev = `/products?page=${+page - 1}`;
        }
        resultObject.info = {
            count: getAllProducts.rows[0].total_count,
            page: Math.ceil(getAllProducts.rows[0].total_count / 20),
            next,
            prev,
        };
        resultObject.results = getAllProducts.rows;
        res.json(resultObject);
    }
    catch (error) {
        console.error(error);
    }
}));
//create a post api for products table
app.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image_url, description, title, price } = req.body;
        const newProduct = yield pool.query('INSERT INTO products (image_url, description, title, price) VALUES ($1, $2, $3, $4) RETURNING *', [image_url, description, title, price]);
        res.json(newProduct.rows);
    }
    catch (error) {
        console.error(error);
    }
}));
app.put('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { image_url, description, title, price } = req.body;
        yield pool.query('UPDATE products set image_url=$1,description=$2,title=$3,price=$4 WHERE id=$5', [image_url, description, title, price, id]);
        res.json('Record was updated successfully');
    }
    catch (error) {
        console.error(error);
    }
}));
app.listen(PORT, () => {
    console.log(`server running on ${PORT} `);
});
