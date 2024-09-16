"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RoutineController_1 = require("../../../controllers/RoutineController");
const routineRouter = express_1.default.Router();
routineRouter.post('/', RoutineController_1.createRoutine);
routineRouter.put('/:routineId', RoutineController_1.updateRoutine);
//routineRouter.get('/:routineId/exercises', authenticateToken, getRoutineExercises);
routineRouter.put('/config/:routineId', RoutineController_1.updateRoutineConfiguration);
routineRouter.get('/:routineId', RoutineController_1.getRoutine);
routineRouter.get('/', RoutineController_1.getRoutines);
exports.default = routineRouter;
