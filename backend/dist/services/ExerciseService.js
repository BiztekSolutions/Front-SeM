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
exports.remove = exports.update = exports.create = exports.get = exports.list = void 0;
const Exercise_1 = __importDefault(require("../models/Exercise"));
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Exercise_1.default.findAll();
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.list = list;
const get = (idExercise) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Exercise_1.default.findByPk(idExercise);
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.get = get;
const create = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.create = create;
const update = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.update = update;
const remove = (idExercise) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Exercise_1.default.destroy({ where: { idExercise } });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.remove = remove;
module.exports = {
    list: exports.list,
    get: exports.get,
    create: exports.create,
    update: exports.update,
    remove: exports.remove,
};
