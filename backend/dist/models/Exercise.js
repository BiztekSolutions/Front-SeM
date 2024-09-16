"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db"));
class Exercise extends sequelize_1.Model {
    static associate(models) {
        this.belongsToMany(models.ExerciseConfiguration, { through: 'ExerciseHasConfiguration', foreignKey: 'idExercise' });
    }
}
Exercise.init({
    idExercise: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    video: {
        type: sequelize_1.DataTypes.STRING,
    },
    image1: {
        type: sequelize_1.DataTypes.STRING,
    },
    image2: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Exercise',
    timestamps: false,
});
exports.default = Exercise;
