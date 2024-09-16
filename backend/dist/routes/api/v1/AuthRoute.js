"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../../../controllers/AuthController");
const validateToken_1 = require("../../../utils/validateToken");
exports.authRouter = express_1.default.Router();
// Register User
exports.authRouter.post('/register', AuthController_1.register);
exports.authRouter.post('/login', AuthController_1.login);
exports.authRouter.post('/logout', validateToken_1.authenticateToken, AuthController_1.logout);
exports.authRouter.post('/refresh', AuthController_1.refresh);
