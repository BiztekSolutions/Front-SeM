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
exports.deleteRoutine = exports.getRoutine = exports.getRoutines = exports.updateRoutineConfiguration = exports.updateRoutine = exports.createRoutine = void 0;
const db_1 = __importDefault(require("../configs/db"));
const Routine_1 = __importDefault(require("../models/Routine"));
const GroupExercise_1 = __importDefault(require("../models/GroupExercise"));
const Exercise_1 = __importDefault(require("../models/Exercise"));
const Client_1 = __importDefault(require("../models/Client"));
const ExerciseConfiguration_1 = __importDefault(require("../models/ExerciseConfiguration"));
const createRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //idClient aca esta mal, es el idUser el que esta llegando
        const { name, observation, objective, exercisesGroup, idClient, startDate, endDate } = req.body;
        const transaction = yield db_1.default.transaction();
        try {
            const client = yield Client_1.default.findOne({ where: { idClient } });
            if (!client) {
                return res.status(404).json({ message: 'Client not found' });
            }
            const routine = yield Routine_1.default.create({
                name,
                observation,
                objective,
                startDate,
                endDate,
                idClient,
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
            //TODO: ClientHasRoutine hace falta agregar?
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
exports.createRoutine = createRoutine;
const updateRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routineId = parseInt(req.params.routineId);
        if (!routineId || isNaN(routineId))
            return res.status(400).json({ message: 'Routine id is required' });
        const { name, observation, objective, exercisesGroup, idClient, startDate, endDate } = req.body;
        const transaction = yield db_1.default.transaction();
        try {
            const routine = yield Routine_1.default.findByPk(routineId, {
                transaction,
                include: [
                    {
                        model: GroupExercise_1.default,
                        include: [
                            {
                                model: ExerciseConfiguration_1.default,
                                include: [
                                    {
                                        model: Exercise_1.default,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            if (!routine) {
                return res.status(404).json({ message: 'Routine not found' });
            }
            //En este for, destruyo todas las configuraciones de ejercicios de cada grupo de ejercicios
            for (let groupExerciseIndex = 0; groupExerciseIndex < routine.GroupExercises.length; groupExerciseIndex++) {
                for (let configurationIndex = 0; configurationIndex < routine.GroupExercises[groupExerciseIndex].ExerciseConfigurations.length; configurationIndex++) {
                    yield ExerciseConfiguration_1.default.destroy({
                        where: {
                            idExerciseConfiguration: routine.GroupExercises[groupExerciseIndex].ExerciseConfigurations[configurationIndex].idExerciseConfiguration,
                        },
                        transaction,
                    });
                }
                yield GroupExercise_1.default.destroy({
                    where: { idGroupExercise: routine.GroupExercises[groupExerciseIndex].idGroupExercise },
                    transaction,
                });
            }
            //Ahora, creo todo desde 0.
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
            //Finalmente updateo los valores de la rutina
            yield routine.update({
                name,
                observation,
                objective,
                startDate,
                endDate,
                idClient: idClient,
            }, { transaction });
            yield transaction.commit();
            res.status(200).json({ message: 'Routine updated successfully', routine });
        }
        catch (error) {
            yield transaction.rollback();
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateRoutine = updateRoutine;
const updateRoutineConfiguration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routineId = parseInt(req.params.routineId);
        if (!routineId || isNaN(routineId))
            return res.status(400).json({ message: 'Routine id is required' });
        const { exerciseId, day, configuration } = req.body;
        const transaction = yield db_1.default.transaction();
        try {
            const routine = yield Routine_1.default.findByPk(routineId, {
                transaction,
                include: [
                    {
                        model: GroupExercise_1.default,
                        include: [
                            {
                                model: ExerciseConfiguration_1.default,
                                include: [
                                    {
                                        model: Exercise_1.default,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            if (!routine) {
                return res.status(404).json({ message: 'Routine not found' });
            }
            // Buscar el grupo de ejercicio correspondiente al día
            const groupExercise = yield GroupExercise_1.default.findOne({
                where: {
                    idRoutine: routine.idRoutine,
                    day: day,
                },
                transaction,
            });
            if (!groupExercise) {
                return res.status(404).json({ message: 'Group Exercise not found for the specified day' });
            }
            // Buscar la configuración de ejercicio correspondiente al ejercicio y al grupo de ejercicio
            const exerciseConfiguration = yield ExerciseConfiguration_1.default.findOne({
                where: {
                    idExercise: exerciseId,
                    idGroupExercise: groupExercise.idGroupExercise,
                },
                transaction,
            });
            if (!exerciseConfiguration) {
                return res.status(404).json({ message: 'Exercise Configuration not found for the specified exercise and day' });
            }
            const updatedProperties = Object.keys(configuration).reduce((acc, key) => {
                if (configuration[key] !== undefined &&
                    configuration[key] !== null &&
                    configuration[key] !== '' &&
                    configuration[key] !== 0) {
                    acc[key] = configuration[key];
                }
                return acc;
            }, {});
            yield exerciseConfiguration.update(updatedProperties, { transaction });
            yield transaction.commit();
            res.status(200).json({ message: 'Exercise Configuration updated successfully', exerciseConfiguration });
        }
        catch (error) {
            yield transaction.rollback();
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.updateRoutineConfiguration = updateRoutineConfiguration;
const getRoutines = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routines = yield Routine_1.default.findAll({
            include: [
                {
                    model: GroupExercise_1.default,
                    include: [
                        {
                            model: Exercise_1.default,
                            include: [ExerciseConfiguration_1.default], // Incluye configuraciones de ejercicio
                        },
                    ],
                },
            ],
        });
        return res.status(200).json({ routines });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getRoutines = getRoutines;
const getRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routineId = parseInt(req.params.routineId);
        if (!routineId || isNaN(routineId))
            return res.status(400).json({ message: 'Routine id is required' });
        const routine = yield Routine_1.default.findByPk(routineId, {
            include: [
                {
                    model: GroupExercise_1.default,
                    include: [
                        {
                            model: ExerciseConfiguration_1.default,
                            include: [
                                {
                                    model: Exercise_1.default,
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        if (!routine)
            return res.status(404).json({ message: 'Routine not found' });
        return res.status(200).json({ routine });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getRoutine = getRoutine;
const deleteRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routineId = parseInt(req.params.routineId);
        if (!routineId || isNaN(routineId))
            return res.status(400).json({ message: 'Routine id is required' });
        const transaction = yield db_1.default.transaction();
        try {
            const routine = yield Routine_1.default.findByPk(routineId);
            if (!routine) {
                return res.status(404).json({ message: 'Routine not found' });
            }
            yield routine.destroy({ transaction });
            yield transaction.commit();
            res.status(200).json({ message: 'Routine deleted successfully' });
        }
        catch (error) {
            yield transaction.rollback();
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.deleteRoutine = deleteRoutine;
