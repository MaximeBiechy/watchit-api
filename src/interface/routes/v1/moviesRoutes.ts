import { Router, Request, Response, NextFunction } from 'express';
import MovieController from '../../controllers/MovieController.js';
import { TYPES } from '../../../config/types.js';
import container from '../../../config/inversify.js';

const router = Router();

const movieController = container.get<MovieController>(TYPES.MovieController);

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await movieController.getMovieDetails(req, res, next);
  } catch (error) {
    next(error);
  }
});

export { router as moviesRoutes };
