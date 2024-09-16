"use strict";
// controllers/GroupController.ts
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
exports.addUserToGroup = exports.deleteUserFromGroup = exports.deleteGroup = exports.setRoutineGroup = exports.getGroupRoutines = exports.getGroups = exports.getGroup = exports.createGroup = void 0;
const Group_1 = __importDefault(require("../models/Group"));
const Routine_1 = __importDefault(require("../models/Routine"));
const Client_1 = __importDefault(require("../models/Client"));
const db_1 = __importDefault(require("../configs/db"));
const GroupService_1 = require("../services/GroupService");
const ClientGroup_1 = __importDefault(require("../models/ClientGroup"));
const ExerciseConfiguration_1 = __importDefault(require("../models/ExerciseConfiguration"));
const GroupExercise_1 = __importDefault(require("../models/GroupExercise"));
const Exercise_1 = __importDefault(require("../models/Exercise"));
// Crear un grupo con clientes asignados
// controllers/groupController.js
//@TODO: Migrar el contenido de este controller a un Service.
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield db_1.default.transaction();
        try {
            const { groupName, selectedUsers } = req.body;
            if (!groupName) {
                return res.status(400).json({ message: 'Group name is required in the request body' });
            }
            if (!selectedUsers || selectedUsers.length === 0) {
                return res.status(400).json({ message: 'At least one user must be selected' });
            }
            const name = groupName;
            const group = yield Group_1.default.create({ name }, { transaction: transaction });
            // Asociar clientes al grupo
            if (group.idGroup) {
                for (const idClient of selectedUsers) {
                    const client = yield Client_1.default.findByPk(idClient);
                    if (client) {
                        yield group.addClient(client, { transaction: transaction });
                    }
                    else {
                        console.error(`Client with id ${idClient} not found`);
                    }
                }
            }
            else {
            }
            // Commit de la transacción
            yield transaction.commit();
            return res.status(201).json({ message: 'Group created successfully', group });
        }
        catch (error) {
            // Revertir la transacción en caso de error
            console.error(error);
            yield transaction.rollback();
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createGroup = createGroup;
// Obtener un grupo con todos los clientes
const getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idGroup = parseInt(req.params.idGroup, 10);
        const group = yield (0, GroupService_1.get)(idGroup);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        return res.status(200).json({ group });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getGroup = getGroup;
// Obtener todos los grupos con sus clientes
const getGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield (0, GroupService_1.list)();
        return res.status(200).json({ groups });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getGroups = getGroups;
const getGroupRoutines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idGroup = parseInt(req.params.idGroup);
        if (!idGroup || isNaN(idGroup))
            return res.status(400).json({ message: 'Group id is required' });
        // Recuperar el usuario con las rutinas asociadas
        const group = yield Group_1.default.findByPk(idGroup, {
            include: [
                {
                    model: Routine_1.default,
                },
            ],
        });
        if (!group) {
            return res.status(400).json({ message: 'Group not found' });
        }
        //@ts-ignore
        return res.status(200).json({ routines: group.Routines });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getGroupRoutines = getGroupRoutines;
//@TODO: Migrar el contenido de este controller a un Service.
const setRoutineGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //idClient aca esta mal, es el idUser el que esta llegando
        const { name, observation, objective, exercisesGroup, idGroup, startDate, endDate } = req.body;
        const transaction = yield db_1.default.transaction();
        try {
            const group = yield Group_1.default.findOne({ where: { idGroup } });
            if (!group) {
                return res.status(404).json({ message: 'Client not found' });
            }
            const routine = yield Routine_1.default.create({
                name,
                observation,
                objective,
                startDate,
                endDate,
                idGroup,
            }, { transaction });
            const groups = Object.entries(exercisesGroup);
            for (const [groupKey, groupValue] of groups) {
                const exercises = Object.entries(groupValue);
                if (exercises.length !== 0) {
                    const groupExercise = yield GroupExercise_1.default.create({
                        idRoutine: routine.idRoutine,
                        day: groupKey,
                    }, { transaction });
                    for (const [exerciseKey, exerciseValue] of exercises) {
                        const exercise = yield Exercise_1.default.findByPk(exerciseValue.idExercise);
                        if (!exercise) {
                            return res.status(404).json({ message: 'Exercise not found' });
                        }
                        yield ExerciseConfiguration_1.default.create({
                            repetitions: exerciseValue.configuration.repetitions,
                            series: exerciseValue.configuration.series,
                            weight: exerciseValue.configuration.weight,
                            progressWeight: exerciseValue.configuration.progressWeight,
                            idExercise: exercise.idExercise,
                            idGroupExercise: groupExercise.idGroupExercise,
                            order: exerciseKey,
                        }, { transaction });
                    }
                }
            }
            yield transaction.commit();
            return res.status(201).json({ message: 'Routine created successfully', routine });
        }
        catch (error) {
            yield transaction.rollback();
            console.error(error);
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.setRoutineGroup = setRoutineGroup;
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield db_1.default.transaction();
    try {
        const idGroup = parseInt(req.params.idGroup, 10);
        const group = yield Group_1.default.findByPk(idGroup);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        const groupRoutine = yield Routine_1.default.findOne({ where: { idGroup: idGroup } });
        if (groupRoutine) {
            groupRoutine.destroy({ transaction: transaction });
        }
        const clientGroup = yield ClientGroup_1.default.findAll({ where: { idGroup: idGroup }, transaction });
        if (clientGroup) {
            clientGroup.forEach((client) => __awaiter(void 0, void 0, void 0, function* () {
                yield client.destroy({ transaction: transaction });
            }));
        }
        yield group.destroy({ transaction: transaction });
        transaction.commit();
        return res.status(200).json({ message: 'Group deleted successfully' });
    }
    catch (error) {
        transaction.rollback();
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteGroup = deleteGroup;
const deleteUserFromGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idGroup = parseInt(req.params.idGroup, 10);
        const { idClient } = req.body;
        const group = yield Group_1.default.findByPk(idGroup);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        const clientGroup = yield ClientGroup_1.default.findOne({
            where: { idGroup, idClient },
        });
        if (clientGroup) {
            yield clientGroup.destroy();
            return res.status(200).json({ message: 'User deleted from group successfully' });
        }
        else {
            return res.status(404).json({ message: 'User not found in the group' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.deleteUserFromGroup = deleteUserFromGroup;
const addUserToGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idGroup = parseInt(req.params.idGroup, 10);
        const { idClient } = req.body;
        const group = yield Group_1.default.findByPk(idGroup);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        const client = yield Client_1.default.findByPk(idClient);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        const clientGroup = yield ClientGroup_1.default.findOne({
            where: { idGroup, idClient },
        });
        if (clientGroup) {
            return res.status(404).json({ message: 'User already in the group' });
        }
        yield group.addClient(client);
        return res.status(200).json({ message: 'User added to group successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.addUserToGroup = addUserToGroup;
