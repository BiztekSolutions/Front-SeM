"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GroupController_1 = require("../../../controllers/GroupController");
const groupRouter = express_1.default.Router();
groupRouter.post('/routine', GroupController_1.setRoutineGroup);
groupRouter.post('/', GroupController_1.createGroup);
groupRouter.get('/:idGroup', GroupController_1.getGroup);
groupRouter.get('/', GroupController_1.getGroups);
groupRouter.delete('/:idGroup', GroupController_1.deleteGroup);
groupRouter.put('/deleteClient/:idGroup', GroupController_1.deleteUserFromGroup);
groupRouter.put('/addClient/:idGroup', GroupController_1.addUserToGroup);
groupRouter.get('/routines/:idGroup', GroupController_1.getGroupRoutines);
exports.default = groupRouter;
