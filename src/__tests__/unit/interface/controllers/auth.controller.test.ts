import { Request, Response, NextFunction } from 'express';
import { jest } from '@jest/globals';
import AuthController from '../../../../interface/controllers/AuthController.js';
import RegisterUserUseCase from '../../../../application/use-cases/RegisterUserUseCase.js';
import UserDTO from '../../../../domain/dtos/UserDTO.js';
import { generateFakeUserWithId } from '../../../helpers/fakeData.js';

describe('AuthController', () => {
  let authController: AuthController;
  let registerUserUseCase: RegisterUserUseCase;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    registerUserUseCase = new RegisterUserUseCase({} as never);
    authController = new AuthController(registerUserUseCase);

    req = {
      body: {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    next = jest.fn();
  });

  it('should create a new user and return it without password', async () => {
    const user: UserDTO = new UserDTO(generateFakeUserWithId());
    jest.spyOn(registerUserUseCase, 'execute').mockResolvedValue(user);

    await authController.createUser(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      user,
      message: 'User created successfully',
    });
  });

  it('should call next with an error if the use case throws', async () => {
    const error = new Error('Something went wrong');
    jest.spyOn(registerUserUseCase, 'execute').mockRejectedValue(error);

    await authController.createUser(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
