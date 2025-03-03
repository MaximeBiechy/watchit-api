import { Router, Request, Response, NextFunction } from 'express';
import { TYPES } from '../../../config/types.js';
import { MovieController } from '../../../interface/controllers/index.js';
import container from '../../../config/inversify.js';

const router = Router();

const movieController = container.get<MovieController>(TYPES.MovieController);

router.get('/now_playing', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await movieController.getNowPlayingMovies(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.get('/upcoming', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await movieController.getUpcomingMovies(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

router.get('/popular', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await movieController.getPopularMovies(req, res, next);
  } catch (error: any) {
    next(error);
  }
});
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await movieController.getMovieDetails(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

export { router as moviesRoutes };
