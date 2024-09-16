"use strict";
// models/Routine.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db"));
class Routine extends sequelize_1.Model {
}
Routine.init({
    idRoutine: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    objective: {
        type: sequelize_1.DataTypes.STRING,
    },
    observation: {
        type: sequelize_1.DataTypes.STRING,
    },
    idClient: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    idGroup: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Routine',
});
exports.default = Routine;
