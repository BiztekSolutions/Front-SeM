import express from 'express';
var bodyParser = require('body-parser');
import { authRouter } from './routes/api/v1/AuthRoute';
import { userRouter } from './routes/api/v1/UsersRoute';

const app = express();
const PORT = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
