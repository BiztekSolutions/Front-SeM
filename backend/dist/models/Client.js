"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db"));
const ClientGroup_1 = __importDefault(require("./ClientGroup")); // Import the ClientGroup model
class Client extends sequelize_1.Model {
    static associate(models) {
        // Routine association
        this.belongsToMany(models.Routine, { through: 'ClientRoutine', foreignKey: 'idClient' });
        // Group association
        this.belongsToMany(models.Group, { through: ClientGroup_1.default, foreignKey: 'idClient' });
    }
}
Client.init({
    idClient: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    trainingLogs: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSONB),
        allowNull: false,
        defaultValue: [],
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Client',
    timestamps: false,
});
exports.default = Client;
