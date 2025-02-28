import { NextFunction, Request, Response } from 'express';
import GetAllUsersUseCase from '../../application/use-cases/GetAllUsersUseCase.js';
import { inject } from 'inversify';
import { TYPES } from '../../config/types.js';
import UserDTO from '../../domain/dtos/UserDTO.js';

class UsersController {
  constructor(@inject(TYPES.GetAllUsersUseCase) private getAllUsersUseCase: GetAllUsersUseCase) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users: UserDTO[] = await this.getAllUsersUseCase.execute();
      return res.status(200).json({
        status: 'success',
        users,
        message: 'Users fetched successfully',
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default UsersController;
