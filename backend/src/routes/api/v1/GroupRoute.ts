import express from 'express';
import { createGroup, getGroup, setRoutineGroup, getGroups, deleteGroup } from '../../../controllers/GroupController';

const groupRouter = express.Router();

groupRouter.post('/:idGroup/routine', setRoutineGroup);
groupRouter.post('/', createGroup);
groupRouter.get('/:idGroup', getGroup);
groupRouter.get('/', getGroups);
groupRouter.delete('/:idGroup', deleteGroup);

export default groupRouter;
