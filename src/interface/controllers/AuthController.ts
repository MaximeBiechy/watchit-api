import { NextFunction, Request, Response } from 'express';
import RegisterUserUseCase from '../../application/use-cases/RegisterUserUseCase.js';
import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
import RegisterUserDTO from '../../domain/dtos/RegisterUserDTO.js';
import UserDTO from '../../domain/dtos/UserDTO.js';

class AuthController {
  constructor(@inject(TYPES.CreateUserUseCase) private createUserUseCase: RegisterUserUseCase) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const registerUserDTO: RegisterUserDTO = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };

      const user: UserDTO = await this.createUserUseCase.execute(registerUserDTO);
      return res.status(201).json({
        status: 'success',
        user,
        message: 'User created successfully',
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default AuthController;
