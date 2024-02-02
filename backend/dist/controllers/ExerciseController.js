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
exports.createExercise = exports.updateExercise = exports.getExercise = exports.getExercises = void 0;
const ExerciseService_1 = require("../services/ExerciseService");
const Exercise_1 = __importDefault(require("../models/Exercise"));
const getExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exercises = yield (0, ExerciseService_1.list)();
        return res.status(200).json({ exercises });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getExercises = getExercises;
const getExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exerciseId = parseInt(req.params.exerciseId);
        if (!exerciseId || isNaN(exerciseId))
            return res.status(400).json({ message: 'Exercise id is required' });
        const exercise = yield (0, ExerciseService_1.get)(exerciseId);
        if (!exercise)
            return res.status(404).json({ message: 'Exercise not found' });
        return res.status(200).json({ exercise });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getExercise = getExercise;
const updateExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { exerciseId } = req.params;
        const { name, description, video, image1, image2, type } = req.body;
        // Buscar el ejercicio por ID
        const exercise = yield Exercise_1.default.findByPk(exerciseId);
        // Si no se encuentra el ejercicio, devolver un error
        if (!exercise) {
            return res.status(404).json({ message: 'Ejercicio no encontrado' });
        }
        exercise.name = name || exercise.name;
        exercise.description = description || exercise.description;
        exercise.video = video || exercise.video;
        exercise.image1 = image1 || exercise.image1;
        exercise.image2 = image2 || exercise.image2;
        exercise.type = type || exercise.type;
        // Guardar los cambios en la base de datos
        yield exercise.save();
        // Devolver el ejercicio actualizado
        return res.status(200).json(exercise);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updateExercise = updateExercise;
const createExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, video, image1, image2, type } = req.body;
        const newExercise = yield Exercise_1.default.create({
            name,
            description,
            video,
            image1,
            image2,
            type,
        });
        return res.status(201).json(newExercise);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createExercise = createExercise;
module.exports = { getExercises: exports.getExercises, getExercise: exports.getExercise, createExercise: exports.createExercise, updateExercise: exports.updateExercise };
