import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const { DB_DEPLOY } = process.env;

const sequelize = new Sequelize(DB_DEPLOY!, {
  logging: false,
  native: false,
});

export default sequelize;
