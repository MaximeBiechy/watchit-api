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

router.get('/:userId/settings', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.getUserSettings(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.patch('/:userId/settings', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.updateUserSettings(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.post('/:userId/watchlist/:mediaId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.addToWatchlist(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.delete('/:userId/watchlist/:mediaId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.removeFromWatchlist(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.post('/:userId/seen/:mediaId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.markAsSeen(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.delete('/:userId/seen/:mediaId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.removeSeenMedia(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.post('/:userId/ratings/:mediaId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.rateMedia(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.patch('/:userId/ratings/:mediaId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.updateRatingMedia(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.delete('/:userId/ratings/:mediaId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usersController.removeMediaRating(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

export { router as usersRoutes };
