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
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.get = exports.list = void 0;
const Relations_1 = require("../models/Relations");
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Relations_1.Routine.findAll();
    }
    catch (e) {
        throw new Error(e.message);
    }
});
exports.list = list;
const get = (idRoutine) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Relations_1.Routine.findOne({
            where: { idRoutine },
            include: [
                {
                    model: Relations_1.GroupExercise,
                    foreignKey: 'idRoutine',
                    attributes: { exclude: ['idRoutine', 'createdAt', 'updatedAt'] },
                    include: [
                        {
                            model: Relations_1.Exercise,
                        },
                        {
                            model: Relations_1.RoutineConfiguration,
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
const create = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.create = create;
const update = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.update = update;
const remove = (idRoutine) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Relations_1.Routine.destroy({ where: { idRoutine } });
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
