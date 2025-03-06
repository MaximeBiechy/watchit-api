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

router.post('/watchlist', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.addToWatchlist(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.delete('/watchlist', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.removeFromWatchlist(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.post('/watch/add', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.markAsSeen(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.delete('/watched/remove', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.removeSeenMedia(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.post('/watched/rate', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.rateMedia(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.patch('/watched/update', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.updateRatingMedia(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.delete('/watched/remove/rating', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.removeMediaRating(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

export { router as usersRoutes };
