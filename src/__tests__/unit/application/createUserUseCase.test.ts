import { jest } from '@jest/globals';
import { CreateUserUseCase } from '../../../application/use-cases/index.js';
import { generateFakeUserWithId } from '../../helpers/fakeData.js';
import { ValidationError } from '../../../shared/errors/index.js';
import AuthRepositoryInterface from '../../../domain/repositories/AuthRepositoryInterface.js';

const mockAuthRepository: Partial<jest.Mocked<AuthRepositoryInterface>> = {
  createUser: jest.fn(),
};

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(mockAuthRepository as AuthRepositoryInterface);
    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    const fakeUser = generateFakeUserWithId();
    const user = {
      username: fakeUser.username,
      email: fakeUser.email,
      password: fakeUser.password,
    };

    const createdUser = {
      id: fakeUser._id,
      username: fakeUser.username,
      email: fakeUser.email,
      createdAt: fakeUser.createdAt,
      updatedAt: fakeUser.updatedAt,
    };

    mockAuthRepository.createUser!.mockResolvedValue(createdUser);

    const result = await createUserUseCase.execute(user);

    expect(result).toHaveProperty('username', user.username);
    expect(result).toHaveProperty('email', user.email);
    expect(result).not.toHaveProperty('password');
    expect(mockAuthRepository.createUser).toHaveBeenCalledTimes(1);
  });

  it('should throw a DatabaseError if repository fails', async () => {
    const fakeUser = generateFakeUserWithId();
    const user = {
      id: fakeUser._id,
      username: fakeUser.username,
      email: fakeUser.email,
      password: fakeUser.password,
      createdAt: fakeUser.createdAt,
      updatedAt: fakeUser.updatedAt,
    };

    mockAuthRepository.createUser!.mockRejectedValue(new Error('Database is down'));

    const promise = createUserUseCase.execute(user);

    await expect(promise).rejects.toThrow('Database is down');

    expect(mockAuthRepository.createUser).toHaveBeenCalledTimes(1);
  });

  it('should throw a ValidationError if user is missing required fields', async () => {
    const user = {
      id: generateFakeUserWithId()._id,
      username: '',
      email: '',
      password: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const promise = createUserUseCase.execute(user);

    await expect(promise).rejects.toThrow(ValidationError);

    expect(mockAuthRepository.createUser).toHaveBeenCalledTimes(0);
  });
});
