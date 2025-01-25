import { Router, Request, Response, NextFunction } from 'express';
import { userController } from '../../controllers/index.js';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await userController.getAllUsers(req, res, next);
});

export { router as usersRoutes };
