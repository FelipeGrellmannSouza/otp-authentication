import { Router } from "express";
import * as pingController from '../controllers/ping';
import * as authController from '../controllers/auth';

export const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);

mainRouter.get('/auth/signin', authController.signin);