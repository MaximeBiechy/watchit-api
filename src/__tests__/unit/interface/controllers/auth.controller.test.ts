import { Request, Response, NextFunction } from 'express';
import { jest } from '@jest/globals';
import { generateFakeUserWithId } from '../../../helpers/fakeData.js';
import {
  SigninUserUseCase,
  RegisterUserUseCase,
  RefreshTokenUseCase,
  ResetPasswordUseCase,
} from '../../../../application/use-cases/index.js';
import { AuthController } from '../../../../interface/controllers/index.js';
import { SigninUserResponseDTO, UserDTO } from '../../../../domain/dtos/index.js';

describe('AuthController', () => {
  let authController: AuthController;
  let registerUserUseCase: RegisterUserUseCase;
  let signinUserUseCase: SigninUserUseCase;
  let refreshTokenUseCase: RefreshTokenUseCase;
  let resetPasswordUseCase: ResetPasswordUseCase;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    registerUserUseCase = new RegisterUserUseCase({} as never);
    signinUserUseCase = new SigninUserUseCase({} as never);
    refreshTokenUseCase = new RefreshTokenUseCase({} as never);
    resetPasswordUseCase = new ResetPasswordUseCase({} as never);
    authController = new AuthController(registerUserUseCase, signinUserUseCase, refreshTokenUseCase, resetPasswordUseCase);

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
    const fakeUser = generateFakeUserWithId();
    const user: UserDTO = new UserDTO(fakeUser._id, fakeUser.username, fakeUser.email, fakeUser.createdAt, fakeUser.updatedAt);
    jest.spyOn(registerUserUseCase, 'execute').mockResolvedValue(user);

    await authController.createUser(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'User created successfully',
      user,
    });
  });

  it('should call next with an error if the use case throws', async () => {
    const error = new Error('Something went wrong');
    jest.spyOn(registerUserUseCase, 'execute').mockRejectedValue(error);

    await authController.createUser(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it('should sign in a user and return it without password', async () => {
    const fakeUser = generateFakeUserWithId();
    const user: SigninUserResponseDTO = {
      id: fakeUser._id,
      username: fakeUser.username,
      email: fakeUser.email,
      accessToken: 'fake-jwt-access-token',
      refreshToken: 'fake-jwt-refresh-token',
    };
    jest.spyOn(signinUserUseCase, 'execute').mockResolvedValue(user);

    await authController.signinUser(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'User signed in successfully',
      user,
    });
  });

  it('should call next with an error if the use case throws', async () => {
    const error = new Error('Something went wrong');
    jest.spyOn(signinUserUseCase, 'execute').mockRejectedValue(error);

    await authController.signinUser(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
