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

import Post from './models/Post';
import Comment from './models/Comment';
import ClientGroup from './models/ClientGroup';
import GroupExercise from './models/GroupExercise';
import ExerciseConfiguration from './models/ExerciseConfiguration';
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
Group.hasMany(ClientGroup, { foreignKey: 'idGroup' });
ClientGroup.belongsTo(Group, { foreignKey: 'idClient' });

Client.hasMany(ClientGroup, { foreignKey: 'idClient' });
ClientGroup.belongsTo(Client, { foreignKey: 'idClient' });

Client.belongsToMany(Routine, { through: 'ClientHasRoutine' });
Routine.belongsToMany(Client, { through: 'ClientHasRoutine' });

// GROUP RELATIONS
Group.hasMany(Routine, { foreignKey: 'groupId' });
Routine.belongsTo(Group, { foreignKey: 'groupId' });

// ROUTINE RELATIONS
Routine.belongsToMany(GroupExercise, { through: 'RoutineHasGroupExercise' });
GroupExercise.belongsToMany(Routine, { through: 'RoutineHasGroupExercise' });

Exercise.belongsToMany(GroupExercise, { through: 'GroupExerciseHasExercise' });
GroupExercise.belongsToMany(Exercise, { through: 'GroupExerciseHasExercise' });

Exercise.belongsToMany(ExerciseConfiguration, { through: 'ExerciseHasConfiguration' });
ExerciseConfiguration.belongsToMany(Exercise, { through: 'ExerciseHasConfiguration' });

//Post relations
Post.hasMany(Comment, { foreignKey: 'postId', as: 'Comments' });
Comment.belongsTo(Post);

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
