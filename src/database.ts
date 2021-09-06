import { dbConfig } from './config/db.config';
// const dbConfig = require('./config/db.config');
// const dbConfig = require('../config/db.config.js');

import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'postgres',
  models: [__dirname + '/models'],
});

// const db: any = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize);
// db.tutorials = require('../controllers/tutorial.controller.js')(
//   sequelize,
//   Sequelize
// );

export { sequelize /*db*/ };
