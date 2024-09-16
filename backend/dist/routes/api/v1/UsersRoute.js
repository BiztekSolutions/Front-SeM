"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../../../controllers/UserController");
const userRouter = express_1.default.Router();
userRouter.get('/allClients', UserController_1.getClients);
userRouter.put('/update/:userId', UserController_1.updateUser);
userRouter.get('/:userId/routines', UserController_1.getUserRoutines);
userRouter.post('/delete/:userId', UserController_1.removeUser);
userRouter.get('/:userId', UserController_1.getUser);
userRouter.get('/', UserController_1.getUsers);
userRouter.post('/createClient', UserController_1.createClient);
userRouter.put('/entrenamientos/:clientId', UserController_1.markDayAsTrained);
userRouter.delete('/entrenamientos/:clientId', UserController_1.markDayAsUntrained);
userRouter.get('/entrenamientos/:clientId', UserController_1.getTrainingDays);
exports.default = userRouter;
