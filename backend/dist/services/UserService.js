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
exports.remove = exports.getRoutines = exports.listCoaches = exports.listClients = exports.list = exports.get = void 0;
const User_1 = __importDefault(require("../models/User"));
const Routine_1 = __importDefault(require("../models/Routine"));
const Client_1 = __importDefault(require("../models/Client"));
const Credential_1 = __importDefault(require("../models/Credential"));
const Coach_1 = __importDefault(require("../models/Coach"));
const ClientGroup_1 = __importDefault(require("../models/ClientGroup"));
const get = (idUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield User_1.default.findByPk(idUser, {
            include: [
                {
                    model: Credential_1.default,
                    attributes: {
                        exclude: ['password', 'idUser'],
                    },
                },
                {
                    model: Client_1.default,
                    include: [
                        {
                            model: ClientGroup_1.default,
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
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield User_1.default.findAll({
            include: [{ model: Credential_1.default, attributes: { exclude: ['password', 'idUser', 'created_date', 'updated_date'] } }],
        });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.list = list;
const listClients = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Client_1.default.findAll({
            include: [
                {
                    model: User_1.default,
                    include: [{ model: Credential_1.default, attributes: { exclude: ['password', 'idUser', 'created_date', 'updated_date'] } }],
                },
            ],
        });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.listClients = listClients;
const listCoaches = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Coach_1.default.findAll({
            include: [
                {
                    model: User_1.default,
                    include: [{ model: Credential_1.default, attributes: { exclude: ['password', 'idUser', 'created_date', 'updated_date'] } }],
                },
            ],
        });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.listCoaches = listCoaches;
const getRoutines = (idUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Client_1.default.findByPk(idUser, {
            include: [
                {
                    model: Routine_1.default,
                },
            ],
        });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.getRoutines = getRoutines;
const remove = (idUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield User_1.default.destroy({ where: { idUser } });
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.remove = remove;
