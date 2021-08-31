"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client = require('./client');
const addMapping = (ind, mapping) => {
    return client.indices.putMapping({
        index: ind,
        body: mapping,
        includeTypeName: true,
    });
};
module.exports = addMapping;
