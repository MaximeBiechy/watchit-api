import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { UserController } from '../../controllers/index.js';
import container from '../../../config/inversify.js';
import { TYPES } from '../../../config/types.js';

const router = Router();

const userController = container.get<UserController>(TYPES.UserController);

router.post('/watchlist', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userController.addToWatchlist(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.delete('/watchlist', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userController.removeFromWatchlist(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.post('/watch/add', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userController.markAsSeen(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.delete('/watched/remove', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userController.removeSeenMedia(req, res, next);
  } catch (error: any) {
    next(error);
  }
});


export { router as userRoutes };
