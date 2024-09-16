"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db"));
class ClientGroup extends sequelize_1.Model {
}
ClientGroup.init({
    idClient: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    idGroup: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'ClientGroup',
    timestamps: false,
});
exports.default = ClientGroup;
