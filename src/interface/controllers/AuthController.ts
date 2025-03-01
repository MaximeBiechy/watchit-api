import { NextFunction, Request, Response } from 'express';
import RegisterUserUseCase from '../../application/use-cases/RegisterUserUseCase.js';
import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
import RegisterUserDTO from '../../domain/dtos/RegisterUserDTO.js';
import UserDTO from '../../domain/dtos/UserDTO.js';
import SigninUserDTO from '../../domain/dtos/SigninUserDTO.js';
import { SigninUserUseCase } from '../../application/use-cases/index.js';
import SigninUserResponseDTO from '../../domain/dtos/SigninUserResponseDTO.js';

class AuthController {
  constructor(
    @inject(TYPES.RegisterUserUseCase) private registerUserUseCase: RegisterUserUseCase,
    @inject(TYPES.SigninUserUseCase) private signinUserUseCase: SigninUserUseCase,
  ) {}

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
}

export default AuthController;
