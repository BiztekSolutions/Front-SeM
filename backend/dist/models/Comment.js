"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../configs/db"));
const Post_1 = __importDefault(require("./Post"));
class Comment extends sequelize_1.Model {
}
Comment.init({
    idComment: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    idPost: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    idClient: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    idCoach: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Comment',
});
Comment.belongsTo(Post_1.default, { foreignKey: 'idPost' });
exports.default = Comment;
