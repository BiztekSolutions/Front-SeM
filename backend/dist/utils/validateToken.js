"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'process.env';
//TODO: Esta funcion solo valida si el token es valido, no que el token este o no en la DB.
// Terminar de implementar.
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    jsonwebtoken_1.default.verify(token, SECRET_KEY || '', (err, user) => {
        console.error(err);
        if (err)
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        next();
    });
};
exports.authenticateToken = authenticateToken;
module.exports = { authenticateToken: exports.authenticateToken };
