"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.logout = exports.login = exports.register = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthService_1 = require("../services/AuthService");
const SessionService_1 = require("../services/SessionService");
const { SECRET_KEY } = process.env;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email) || !((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password)) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const { email, password } = req.body;
        const existingUser = yield (0, AuthService_1.isRegistered)(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        console.log(req.body);
        const user = yield (0, AuthService_1.create)(email, hashedPassword, req.body.name, req.body.lastname, req.body.avatar);
        if (user) {
            return res.status(201).json({ message: 'User registered successfully', user });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userCredentials = yield (0, AuthService_1.isRegistered)(email);
        if (!userCredentials) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, userCredentials.password);
        if (!isValidPassword) {
            return res.status(403).json({ message: 'Invalid credentials' });
        }
        const existingSession = yield (0, SessionService_1.find)(userCredentials.idCredential);
        if (!existingSession) {
            const token = jsonwebtoken_1.default.sign({ userId: userCredentials.idCredential }, SECRET_KEY || '', { expiresIn: '24h' });
            const newSession = yield (0, SessionService_1.create)(token, userCredentials.idCredential);
            return res.status(200).json({
                message: 'User logged',
                session: {
                    token: newSession.token,
                    userId: userCredentials.idCredential,
                },
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: userCredentials.idCredential }, SECRET_KEY || '', { expiresIn: '24h' });
        const newSession = yield (0, SessionService_1.create)(token, userCredentials.idCredential);
        const rowsAffected = yield (0, SessionService_1.remove)(existingSession.token);
        console.log(rowsAffected);
        return res.status(200).json({
            message: 'User logged',
            session: {
                token: newSession.token,
                userId: userCredentials.idCredential,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token)
            return res.status(401).json({ message: 'Unauthorized' });
        const rowsAffected = yield (0, SessionService_1.remove)(token);
        if (!rowsAffected)
            return res.status(401).json({ message: 'Unauthorized' });
        return res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.logout = logout;
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: implementar
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.refresh = refresh;
