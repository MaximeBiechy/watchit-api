import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
import {
  SigninUserUseCase,
  RegisterUserUseCase,
  RefreshTokenUseCase,
  ResetPasswordUseCase,
} from '../../application/use-cases/index.js';
import { RegisterUserDTO, SigninUserDTO, SigninUserResponseDTO, UserDTO } from '../../domain/dtos/index.js';

class AuthController {
  constructor(
    @inject(TYPES.RegisterUserUseCase) private registerUserUseCase: RegisterUserUseCase,
    @inject(TYPES.SigninUserUseCase) private signinUserUseCase: SigninUserUseCase,
    @inject(TYPES.RefreshTokenUseCase) private refreshTokenUseCase: RefreshTokenUseCase,
    @inject(TYPES.ResetPasswordUseCase) private resetPasswordUseCase: ResetPasswordUseCase,
  ) {
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const registerUserDTO: RegisterUserDTO = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };

      const user: UserDTO = await this.registerUserUseCase.execute(registerUserDTO);

      return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        user,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async signinUser(req: Request, res: Response, next: NextFunction) {
    try {
      const signinUserDTO: SigninUserDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const user: SigninUserResponseDTO = await this.signinUserUseCase.execute(signinUserDTO);

      return res.status(200).json({
        status: 'success',
        message: 'User signed in successfully',
        user,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.body.refreshToken;

      const user: SigninUserResponseDTO = await this.refreshTokenUseCase.execute(refreshToken);

      return res.status(200).json({
        status: 'success',
        message: 'Token refreshed successfully',
        user,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      const newPassword = req.body.newPassword;

      await this.resetPasswordUseCase.execute(email, newPassword);

      return res.status(200).json({
        status: 'success',
        message: 'Password reset successfully',
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default AuthController;
