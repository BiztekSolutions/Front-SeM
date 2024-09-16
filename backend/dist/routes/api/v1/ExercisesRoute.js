"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ExerciseController_1 = require("../../../controllers/ExerciseController");
const exerciseRouter = express_1.default.Router();
exerciseRouter.post('/', ExerciseController_1.createExercise);
exerciseRouter.get('/:exerciseId', ExerciseController_1.getExercise);
exerciseRouter.get('/', ExerciseController_1.getExercises);
exerciseRouter.put('/:exerciseId', ExerciseController_1.updateExercise);
exerciseRouter.post('/upload-image/:imageFolder/:imageName', ExerciseController_1.uploadToS3, ExerciseController_1.uploadImage);
exports.default = exerciseRouter;
