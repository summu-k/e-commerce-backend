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
Object.defineProperty(exports, "__esModule", { value: true });
const client = require('./client');
const isIndexExist = require('./isIndexExist');
const addMapping = require('./addMapping');
const { PRODUCTS_INDEX, mappings: { productsMapping }, } = require('../../constant/es.constants');
const createIndex = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exists = yield isIndexExist(PRODUCTS_INDEX);
        if (!exists) {
            console.log(`Creating index ${PRODUCTS_INDEX}...`);
            yield client.indices.create({ index: PRODUCTS_INDEX });
            productsMapping && (yield addMapping(PRODUCTS_INDEX, productsMapping));
        }
        else {
            console.log(`Index ${PRODUCTS_INDEX} exists`);
        }
    }
    catch (err) {
        console.log(`Unable to create index index ${PRODUCTS_INDEX}...`, err);
    }
});
module.exports = createIndex;
