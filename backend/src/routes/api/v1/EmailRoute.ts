// routes/commentRoute.ts
import express, { Router } from 'express';
import { enviarCorreo } from '../../../controllers/EmailController';

const emailRouter: Router = express.Router();

emailRouter.post('/', enviarCorreo);


export default emailRouter;
