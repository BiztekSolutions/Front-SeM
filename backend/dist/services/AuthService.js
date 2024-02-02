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
exports.create = exports.isRegistered = void 0;
const Credential_1 = __importDefault(require("../models/Credential"));
const User_1 = __importDefault(require("../models/User"));
const isRegistered = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Credential_1.default.findOne({ where: { email } });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.isRegistered = isRegistered;
const create = (email, password, name, lastname, avatar) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Credential_1.default.create({
            email: email,
            password: password,
            created_date: new Date(),
            updated_date: new Date(),
            User: {
                name: name,
                lastname: lastname,
                avatar: avatar,
                created_date: new Date(),
                updated_date: new Date(),
            },
        }, {
            include: [User_1.default],
        });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.create = create;
