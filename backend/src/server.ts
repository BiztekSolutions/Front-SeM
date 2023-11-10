import express from 'express';
var bodyParser = require('body-parser');
import { authRouter } from './routes/api/v1/AuthRoute';
import { userRouter } from './routes/api/v1/UsersRoute';
import { routineRouter } from './routes/api/v1/RoutineRoute';
import { exerciseRouter } from './routes/api/v1/ExercisesRoute';

const app = express();
const PORT = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/routines', routineRouter);
app.use('/api/v1/exercises', routineRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
