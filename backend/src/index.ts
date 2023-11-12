import express, { Application, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './db';
import router from './routes/api/v1/mainRouter';

import { Credential, Session, UserModel } from './models/Relations';

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
UserModel.hasMany(Credential, { foreignKey: 'idUser' });
Credential.belongsTo(UserModel, { foreignKey: 'idUser' });

Session.belongsTo(Credential, { foreignKey: 'idCredential' });
Credential.hasMany(Session, { foreignKey: 'idCredential' });
// sequelize
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
