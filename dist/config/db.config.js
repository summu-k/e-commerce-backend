"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const dbConfig = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: '',
    DB: 'ecommerce',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
exports.dbConfig = dbConfig;
