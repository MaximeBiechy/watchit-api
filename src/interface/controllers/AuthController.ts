import { NextFunction, Request, Response } from 'express';
import CreateUserUseCase from '../../application/use-cases/CreateUserUseCase.js';
import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
import CreateUserDTO from '../../domain/dtos/CreateUserDTO.js';

class AuthController {
  constructor(@inject(TYPES.CreateUserUseCase) private createUserUseCase: CreateUserUseCase) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserDTO = new CreateUserDTO(req.body);
      const userDTO = await this.createUserUseCase.execute(createUserDTO);
      return res.status(201).json(userDTO);
    } catch (error: any) {
      next(error);
    }
  }
}

export default AuthController;
