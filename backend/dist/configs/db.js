"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DB_DEPLOY = "postgres://fl0user:F1sRvJ2lNaDy@ep-tight-meadow-70146425.us-east-2.aws.neon.fl0.io:5432/salud-en-movimiento?sslmode=require";
const sequelize = new sequelize_1.Sequelize(DB_DEPLOY, {
    dialect: 'postgres',
});
exports.default = sequelize;
