import { Request, Response, NextFunction } from 'express';
import { jest } from '@jest/globals';
import UsersController from '../../../../interface/controllers/UsersController.js';
import GetAllUsersUseCase from '../../../../application/use-cases/GetAllUsersUseCase.js';
import UserDTO from '../../../../domain/dtos/UserDTO.js';
import { generateFakeUserWithId } from '../../../helpers/fakeData.js';

describe('UsersController', () => {
  let usersController: UsersController;
  let getAllUsersUseCase: GetAllUsersUseCase;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    getAllUsersUseCase = new GetAllUsersUseCase({} as never);
    usersController = new UsersController(getAllUsersUseCase);

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    next = jest.fn();
  });

  it('should return 200 and the list of users', async () => {
    const fakeUser = generateFakeUserWithId();
    const users: UserDTO[] = [
      new UserDTO(fakeUser._id, fakeUser.username, fakeUser.email, fakeUser.createdAt, fakeUser.updatedAt),
    ];
    jest.spyOn(getAllUsersUseCase, 'execute').mockResolvedValue(users);

    await usersController.getAllUsers(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      users,
      message: 'Users fetched successfully',
    });
  });

  it('should call next with an error if the use case throws', async () => {
    const error = new Error('Something went wrong');
    jest.spyOn(getAllUsersUseCase, 'execute').mockRejectedValue(error);

    await usersController.getAllUsers(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
