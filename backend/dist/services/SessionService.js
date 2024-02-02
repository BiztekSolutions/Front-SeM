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
exports.find = exports.remove = exports.create = void 0;
const Session_1 = __importDefault(require("../models/Session"));
const create = (jwt, idCredential) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Session_1.default.create({
            token: jwt,
            created_date: new Date(),
            updated_date: new Date(),
            idCredential: idCredential,
        });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.create = create;
const remove = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Session_1.default.destroy({ where: { token } });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.remove = remove;
const find = (idCredential) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Session_1.default.findOne({ where: { idCredential: idCredential } });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.find = find;
module.exports = {
    create: exports.create,
    remove: exports.remove,
    find: exports.find,
};
