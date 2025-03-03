import { Router, Request, Response, NextFunction } from 'express';
import { TYPES } from '../../../config/types.js';
import container from '../../../config/inversify.js';
import { UsersController } from '../../../interface/controllers/index.js';

const router = Router();

const usersController = container.get<UsersController>(TYPES.UsersController);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.getAllUsers(req, res, next);
  } catch (error) {
    next(error);
  }
});

export { router as usersRoutes };
