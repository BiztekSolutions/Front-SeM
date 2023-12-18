import express from 'express';
import {
  createGroup,
  getGroup,
  setRoutineGroup,
  getGroups,
  deleteGroup,
  getGroupRoutines,
} from '../../../controllers/GroupController';

const groupRouter = express.Router();

groupRouter.post('/routine', setRoutineGroup);
groupRouter.post('/', createGroup);
groupRouter.get('/:idGroup', getGroup);
groupRouter.get('/', getGroups);
groupRouter.delete('/:idGroup', deleteGroup);
groupRouter.get('/routines/:idGroup', getGroupRoutines);
export default groupRouter;
