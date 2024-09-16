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
const Client_1 = __importDefault(require("../models/Client"));
const ClientGroup_1 = __importDefault(require("../models/ClientGroup"));
const Group_1 = __importDefault(require("../models/Group"));
const User_1 = __importDefault(require("../models/User"));
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Group_1.default.findAll({
            include: [
                {
                    model: ClientGroup_1.default,
                    include: [
                        {
                            model: Client_1.default,
                            include: [
                                {
                                    model: User_1.default,
                                    attributes: { exclude: ['idUser'] },
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.list = list;
const get = (idGroup) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Group_1.default.findByPk(idGroup, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: ClientGroup_1.default,
                    include: [
                        {
                            model: Client_1.default,
                            include: [
                                {
                                    model: User_1.default,
                                    attributes: { exclude: ['idUser'] },
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.get = get;
const create = (idGroup) => __awaiter(void 0, void 0, void 0, function* () { });
exports.create = create;
const update = (idGroup) => __awaiter(void 0, void 0, void 0, function* () { });
exports.update = update;
const remove = (idGroup) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Group_1.default.destroy({ where: { idGroup } });
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
