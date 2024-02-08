import { Sequelize } from 'sequelize';

const DB_DEPLOY = "postgres://fl0user:F1sRvJ2lNaDy@ep-tight-meadow-70146425.us-east-2.aws.neon.fl0.io:5432/salud-en-movimiento?sslmode=require";

const sequelize = new Sequelize(DB_DEPLOY!, {
  dialect: 'postgres',
});

export default sequelize;
