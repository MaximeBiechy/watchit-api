import { Router } from 'express';
import { UserController } from '../../controllers/index.js';
import container from '../../../config/inversify.js';
import { TYPES } from '../../../config/types.js';

const router = Router();

const userController = container.get<UserController>(TYPES.UserController);

router.post('/watchlist', async (req, res, next) => {
  try {
    await userController.addToWatchlist(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

export { router as userRoutes };
