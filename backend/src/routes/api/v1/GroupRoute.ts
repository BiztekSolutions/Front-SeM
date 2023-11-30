import express from 'express';
import { createGroup, getGroup, setRoutineGroup, getGroups } from '../../../controllers/GroupController';

const groupRouter = express.Router();

groupRouter.post('/', createGroup);
groupRouter.get('/:idGroup', getGroup);
groupRouter.post('/:idGroup', setRoutineGroup);
groupRouter.get('/', getGroups);

export default groupRouter;
