import { Router, Request, Response, NextFunction } from 'express';
import { SearchController } from '../../controllers/index.js';
import container from '../../../config/inversify.js';
import { TYPES } from '../../../config/types.js';

const router = Router();

const searchController = container.get<SearchController>(TYPES.SearchController);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await searchController.search(req, res, next);
  } catch (error: any) {
    next(error);
  }
});

export { router as searchRoutes };
