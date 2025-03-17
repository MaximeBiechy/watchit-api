import { Router, Request, Response, NextFunction } from 'express';
import { TYPES } from '../../../config/types.js';
import container from '../../../config/inversify.js';
import { validateDTO } from '../../../app/middlewares/validateDTO.js';
import { AuthController } from '../../../interface/controllers/index.js';
import { RegisterUserDTO, SigninUserDTO } from '../../../domain/dtos/index.js';

const router = Router();

const authController = container.get<AuthController>(TYPES.AuthController);

router.post('/register', validateDTO(RegisterUserDTO), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authController.createUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.post('/signin', validateDTO(SigninUserDTO), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authController.signinUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authController.refreshToken(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await authController.resetPassword(req, res, next);
  } catch (error) {
    next(error);
  }
});

export { router as authRoutes };
