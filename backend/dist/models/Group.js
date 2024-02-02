"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db"));
const Client_1 = __importDefault(require("./Client"));
const Routine_1 = __importDefault(require("./Routine"));
const ClientGroup_1 = __importDefault(require("./ClientGroup"));
class Group extends sequelize_1.Model {
}
Group.init({
    idGroup: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Group',
});
// Asociación muchos a muchos con Client
Group.belongsToMany(Client_1.default, {
    through: ClientGroup_1.default,
    foreignKey: 'idGroup',
    otherKey: 'idClient', // Clave foránea en la tabla intermedia que apunta a Client
});
// Asociación muchos a muchos con Routine
Group.belongsToMany(Routine_1.default, {
    through: 'GroupRoutine',
    foreignKey: 'idGroup',
    otherKey: 'idRoutine', // Clave foránea en la tabla intermedia que apunta a Routine
});
exports.default = Group;
