import express, { Application, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './configs/db';
import router from './routes/api/v1/mainRouter';
import User from './models/User';
import Credential from './models/Credential';
import Session from './models/Session';
import Client from './models/Client';
import Coach from './models/Coach';
import Group from './models/Group';
import Routine from './models/Routine';
import Exercise from './models/Exercise';
import RoutineHasExercise from './models/RoutineHasExercise';
import RoutineConfiguration from './models/RoutineConfiguration';

const app: Application = express();
const PORT: number = 3000;

// Middlewares
app.use(express.json());
app.use(logger('dev'));
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// USER RELATIONS
User.hasMany(Credential, { foreignKey: 'idUser' });
Credential.belongsTo(User, { foreignKey: 'idUser' });

Session.belongsTo(Credential, { foreignKey: 'idCredential' });
Credential.hasMany(Session, { foreignKey: 'idCredential' });

//User.hasOne(Client, { foreignKey: 'idUser' });
Client.belongsTo(User, { foreignKey: 'idUser' });

//User.hasOne(Coach, { foreignKey: 'idUser' });
Coach.belongsTo(User, { foreignKey: 'idUser' });

// CLIENT RELATIONS
Client.belongsTo(Group, { foreignKey: 'idGroup' });
Group.hasMany(Client, { foreignKey: 'idGroup' });

Client.belongsToMany(Routine, { through: 'ClientHasRoutine' });
Routine.belongsToMany(Client, { through: 'ClientHasRoutine' });

// GROUP RELATIONS
//Group.hasOne(Routine);
Routine.hasOne(Group);

// ROUTINE RELATIONS
Routine.hasMany(RoutineHasExercise, { foreignKey: 'RoutineIdRoutine' });
RoutineHasExercise.belongsTo(Routine, { foreignKey: 'RoutineIdRoutine' });

Exercise.hasMany(RoutineHasExercise, { foreignKey: 'ExerciseIdExercise' });
RoutineHasExercise.belongsTo(Exercise, { foreignKey: 'ExerciseIdExercise' });

RoutineConfiguration.hasMany(RoutineHasExercise, { foreignKey: 'RoutineConfigurationIdRoutineConfiguration' });
RoutineHasExercise.belongsTo(RoutineConfiguration, { foreignKey: 'RoutineConfigurationIdRoutineConfiguration' });

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database & tables created!`);
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.log(err);
  });

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = (err as any).status || 500;
  const message = (err as any).message || err;
  console.error(err);
  res.status(status).json(message);
});

app.use('/', router);

export default app;
