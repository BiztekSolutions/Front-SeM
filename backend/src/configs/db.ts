import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const database = "salud-en-movimiento";
const username = "postgres";
const password = "arian";
const host = "localhost";

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
});

export default sequelize;