import { Router } from 'express';
import container from '../../../config/inversify.js';
import { ActorsController } from '../../controllers/index.js';
import { TYPES } from '../../../config/types.js';

const router = Router();

const actorController = container.get<ActorsController>(TYPES.ActorsController);

router.get('/:actorId/movies', async (req, res, next) => {
  try {
    await actorController.getMoviesByActor(req, res, next);
  } catch (error) {
    next(error);
  }
});

export { router as actorsRoutes };
