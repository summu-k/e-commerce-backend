"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
// module.exports = new Client({ node: 'http://localhost:9200' });
const client = new elasticsearch_1.Client({ node: 'http://localhost:9200' });
exports.client = client;
