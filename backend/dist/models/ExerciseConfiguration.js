"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db"));
class ExerciseConfiguration extends sequelize_1.Model {
}
ExerciseConfiguration.init({
    idExerciseConfiguration: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    series: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    repetitions: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    weight: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    progressWeight: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    order: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: db_1.default,
    modelName: 'ExerciseConfiguration',
    timestamps: false,
});
exports.default = ExerciseConfiguration;
