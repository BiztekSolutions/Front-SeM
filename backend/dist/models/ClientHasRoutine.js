"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db"));
class ClientHasRoutine extends sequelize_1.Model {
}
ClientHasRoutine.init({
    idClientHasRoutine: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'ClientHasRoutine',
    timestamps: false,
});
exports.default = ClientHasRoutine;
