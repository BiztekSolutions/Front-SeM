import express, { Application, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './db';
import router from './routes/api/v1/mainRouter';

import {
  User,
  Session,
  Credential,
  Client,
  Coach,
  Group,
  Routine,
  Exercise,
  RoutineHasExercise,
  RoutineConfiguration,
} from './models/Relations';

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

User.hasOne(Client, { foreignKey: 'idUser' });
Client.belongsTo(User, { foreignKey: 'idUser' });

User.hasOne(Coach, { foreignKey: 'idUser' });
Coach.belongsTo(User, { foreignKey: 'idUser' });

// CLIENT RELATIONS
Client.belongsTo(Group, { foreignKey: 'idClient' });
Group.hasMany(Client, { foreignKey: 'idClient' });

Client.belongsToMany(Routine, { through: 'ClientHasRoutine' });
Routine.belongsToMany(Client, { through: 'ClientHasRoutine' });

// GROUP RELATIONS
Group.hasOne(Routine);
Routine.belongsTo(Group);

// ROUTINE RELATIONS
Routine.belongsToMany(Exercise, { through: RoutineHasExercise });
Exercise.belongsToMany(Routine, { through: RoutineHasExercise });
RoutineHasExercise.hasOne(RoutineConfiguration);
RoutineConfiguration.belongsTo(RoutineHasExercise);

sequelize
  .sync({ force: false })
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
