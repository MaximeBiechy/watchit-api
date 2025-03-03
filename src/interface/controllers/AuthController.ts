import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
import { SigninUserUseCase, RegisterUserUseCase } from '../../application/use-cases/index.js';
import { RegisterUserDTO, SigninUserDTO, SigninUserResponseDTO, UserDTO } from '../../domain/dtos/index.js';

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
