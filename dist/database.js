"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const db_config_1 = require("./config/db.config");
// const dbConfig = require('./config/db.config');
// const dbConfig = require('../config/db.config.js');
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize(db_config_1.dbConfig.DB, db_config_1.dbConfig.USER, db_config_1.dbConfig.PASSWORD, {
    host: db_config_1.dbConfig.HOST,
    dialect: 'postgres',
    models: [__dirname + '/models'],
});
exports.sequelize = sequelize;
