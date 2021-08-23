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
app.use(cors_1.default());
app.use(express_1.default.json());
if (process.env.NODE_ENV === 'production') {
}
//GET api get all products
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllProducts = yield pool.query('SELECT * FROM products');
        res.json(getAllProducts.rows);
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
