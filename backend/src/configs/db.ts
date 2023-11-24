import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const DB_DEPLOY = process.env.DB_DEPLOY;

const sequelize = new Sequelize(DB_DEPLOY!, {
  dialect: 'postgres', // Asegúrate de especificar el dialecto correcto (puede ser 'mysql', 'sqlite', 'mssql', etc.)
});

export default sequelize;
