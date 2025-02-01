import { Request, Response, NextFunction } from 'express';
import { jest } from '@jest/globals';
import UsersController from '../../../../interface/controllers/UsersController';
import GetAllUsersUseCase from '../../../../application/use-cases/GetAllUsersUseCase';
import UserDTO from '../../../../domain/dtos/UserDTO';
import { generateFakeUserWithId } from '../../../helpers/fakeData.js';

describe('UsersController', () => {
  let usersController: UsersController;
  let getAllUsersUseCase: GetAllUsersUseCase;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    getAllUsersUseCase = new GetAllUsersUseCase({} as any);
    usersController = new UsersController(getAllUsersUseCase);

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    next = jest.fn();
  });

  it('should return 200 and the list of users', async () => {
    const users: UserDTO[] = [new UserDTO(generateFakeUserWithId())];
    jest.spyOn(getAllUsersUseCase, 'execute').mockResolvedValue(users);

    await usersController.getAllUsers(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users);
  });

  it('should call next with an error if the use case throws', async () => {
    const error = new Error('Something went wrong');
    jest.spyOn(getAllUsersUseCase, 'execute').mockRejectedValue(error);

    await usersController.getAllUsers(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
