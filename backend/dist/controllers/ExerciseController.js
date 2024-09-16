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
exports.uploadImage = exports.uploadToS3 = exports.createExercise = exports.updateExercise = exports.getExercise = exports.getExercises = void 0;
const ExerciseService_1 = require("../services/ExerciseService");
const Exercise_1 = __importDefault(require("../models/Exercise"));
// import aws from 'aws-sdk';
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const db_1 = require("../configs/db");
const interfaces_1 = require("../utils/interfaces");
const s3 = new client_s3_1.S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: db_1.awsS3id,
        secretAccessKey: db_1.awsS3secret,
    },
});
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
const uploadImageToS3 = (0, multer_1.default)({
    fileFilter: (_req, file, cb) => {
        if (['jpg', 'png', 'jpeg', 'gif'].some(ext => file.originalname.endsWith('.' + ext))) {
            console.log('file***********************', file);
            return cb(null, true);
        }
        const error = new interfaces_1.CustomError(400, `Only ${['jpg', 'png', 'jpeg', 'gif'].join(', ')} files are allowed!`);
        return cb(error);
    },
    storage: (0, multer_s3_1.default)({
        s3: s3,
        // acl: 'public-read',
        bucket: db_1.awsS3BucketName,
        key: (req, _file, cb) => {
            console.log(req, 'req');
            cb(null, `${req.params.imageFolder}/${req.params.imageName}`);
        },
    }),
});
exports.uploadToS3 = uploadImageToS3.single('image');
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica si el archivo fue cargado
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded.' });
    }
    try {
        // Aquí puedes realizar operaciones adicionales si es necesario
        // Por ejemplo, guardar la URL del archivo en una base de datos
        // Envía la URL del archivo como respuesta
        return res.status(200).send({ payload: req.file.location });
    }
    catch (e) {
        console.error(e);
        if (e.name === 'CustomError') {
            res.status(e.status).send({ error: e.message });
        }
        else {
            res.status(500).send({ error: 'The API is not responding' });
        }
    }
});
exports.uploadImage = uploadImage;
module.exports = { getExercises: exports.getExercises, getExercise: exports.getExercise, createExercise: exports.createExercise, updateExercise: exports.updateExercise, uploadToS3: exports.uploadToS3, uploadImage: exports.uploadImage };
// TODO: bucket name into env file
