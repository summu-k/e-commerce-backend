"use strict";
exports.PRODUCTS_INDEX = 'products';
exports.PRODUCTS_TYPE = 'products';
exports.mappings = {
    productsMapping: {
        properties: {
            product_name: { type: 'text' },
            product_id: { type: 'keyword' },
            brand: { type: 'text' },
            description: { type: 'text' },
            images: { type: 'text' },
        },
    },
};
