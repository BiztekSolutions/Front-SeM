"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db"));
class Credential extends sequelize_1.Model {
}
Credential.init({
    idCredential: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    created_date: {
        type: sequelize_1.DataTypes.DATE,
    },
    updated_date: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Credential',
    timestamps: false,
});
exports.default = Credential;
