import { NextFunction, Request, Response } from 'express';
import GetAllUsersUseCase from '../../application/use-cases/GetAllUsersUseCase.js';
import CreateUserUseCase from '../../application/use-cases/CreateUserUseCase.js';
import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';

class UsersController {
  constructor(
    @inject(TYPES.GetAllUsersUseCase) private getAllUsersUseCase: GetAllUsersUseCase,
    @inject(TYPES.CreateUserUseCase) private createUserUseCase: CreateUserUseCase,
  ) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.getAllUsersUseCase.execute();
      return res.status(200).json(users);
    } catch (error: any) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;
      const createdUser = await this.createUserUseCase.execute(user);
      return res.status(201).json(createdUser);
    } catch (error: any) {
      next(error);
    }
  }
}

export default UsersController;
