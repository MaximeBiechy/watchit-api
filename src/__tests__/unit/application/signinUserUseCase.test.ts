import { jest } from '@jest/globals';
import { generateFakeUserWithId } from '../../helpers/fakeData.js';
import AuthRepositoryInterface from '../../../domain/repositories/AuthRepositoryInterface.js';
import { SigninUserUseCase } from '../../../application/use-cases/index.js';

const mockAuthRepository: Partial<jest.Mocked<AuthRepositoryInterface>> = {
  findByEmail: jest.fn(),
};

describe('SigninUserUseCase', () => {
  let signinUserUseCase: SigninUserUseCase;

  beforeEach(() => {
    signinUserUseCase = new SigninUserUseCase(mockAuthRepository as AuthRepositoryInterface);
    jest.clearAllMocks();
  });

  it('should signin a user', async () => {
    const fakeUser = generateFakeUserWithId();
    const user = {
      email: fakeUser.email,
      password: fakeUser.password,
    };

    const foundUser = {
      id: fakeUser._id,
      username: fakeUser.username,
      email: fakeUser.email,
      createdAt: fakeUser.createdAt,
      updatedAt: fakeUser.updatedAt,
    };

    mockAuthRepository.findByEmail!.mockResolvedValue(foundUser);

    const result = await signinUserUseCase.execute(user);

    expect(result).toHaveProperty('username', foundUser.username);
    expect(result).toHaveProperty('email', foundUser.email);
    expect(result).not.toHaveProperty('password');
    expect(mockAuthRepository.findByEmail).toHaveBeenCalledTimes(1);
  });

  it('should throw a DatabaseError if repository fails', async () => {
    const fakeUser = generateFakeUserWithId();
    const user = {
      email: fakeUser.email,
      password: fakeUser.password,
    };

    mockAuthRepository.findByEmail!.mockRejectedValue(new Error('Database is down'));

    const promise = signinUserUseCase.execute(user);

    await expect(promise).rejects.toThrow('Database is down');
  });

  it('should throw a ValidationError if user is not found', async () => {
    const fakeUser = generateFakeUserWithId();
    const user = {
      email: fakeUser.email,
      password: fakeUser.password,
    };

    mockAuthRepository.findByEmail!.mockResolvedValue(null);

    const promise = signinUserUseCase.execute(user);

    await expect(promise).rejects.toThrow('Invalid credentials');
  });
});
