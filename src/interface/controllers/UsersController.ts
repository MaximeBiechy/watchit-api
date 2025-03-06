import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
import { GetAllUsersUseCase } from '../../application/use-cases/index.js';
import { UserDTO } from '../../domain/dtos/index.js';

class UsersController {
  constructor(@inject(TYPES.GetAllUsersUseCase) private getAllUsersUseCase: GetAllUsersUseCase) {
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users: UserDTO[] = await this.getAllUsersUseCase.execute();
      return res.status(200).json({
        status: 'success',
        message: 'Users fetched successfully',
        users,
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default UsersController;
