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
exports.getCoaches = exports.createCoach = void 0;
const Coach_1 = __importDefault(require("../models/Coach"));
const UserService_1 = require("../services/UserService");
const createCoach = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User id is required in the request body' });
        }
        // Verificar si el usuario ya tiene un cliente asociado
        const existingCoach = yield Coach_1.default.findOne({ where: { idUser: userId } });
        if (existingCoach) {
            return res.status(400).json({ message: 'Coach already exists for this user' });
        }
        const newCoach = yield Coach_1.default.create({
            idUser: userId,
        });
        return res.status(201).json({ message: 'Coach created successfully', newCoach });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createCoach = createCoach;
const getCoaches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coach = yield (0, UserService_1.listCoaches)();
        return res.status(200).json({ message: 'all coach', coach });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getCoaches = getCoaches;
