"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CoachController_1 = require("../../../controllers/CoachController");
const coachRouter = express_1.default.Router();
coachRouter.post('/', CoachController_1.createCoach);
coachRouter.get('/', CoachController_1.getCoaches);
exports.default = coachRouter;
