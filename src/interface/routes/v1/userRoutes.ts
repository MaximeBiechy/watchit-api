import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { UserController } from '../../controllers/index.js';
import container from '../../../config/inversify.js';
import { TYPES } from '../../../config/types.js';

const router = Router();

const userController = container.get<UserController>(TYPES.UserController);


export { router as userRoutes };
