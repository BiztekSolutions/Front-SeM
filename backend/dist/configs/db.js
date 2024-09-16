"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsS3BucketName = exports.awsS3secret = exports.awsS3id = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_1 = require("sequelize");
const { DB_DEPLOY } = process.env;
exports.awsS3id = process.env.AWS_S3_ID;
exports.awsS3secret = process.env.AWS_S3_SECRET;
exports.awsS3BucketName = process.env.AWS_S3_BUCKET_NAME;
const sequelize = new sequelize_1.Sequelize(DB_DEPLOY, {
    dialect: 'postgres',
});
exports.default = sequelize;
