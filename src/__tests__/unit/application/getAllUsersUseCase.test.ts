import { jest } from '@jest/globals';
import { UsersRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError } from '../../../shared/errors/index.js';
import { UserDTO } from '../../../domain/dtos/index.js';
import { GetAllUsersUseCase } from '../../../application/use-cases/index.js';
import { generateFakeUserWithId } from '../../helpers/fakeData.js';

const mockUserRepository: Partial<jest.Mocked<UsersRepositoryInterface>> = {
  getAllUsers: jest.fn(),
};

describe('GetAllUsersUseCase', () => {
  let getAllUsersUseCase: GetAllUsersUseCase;

  beforeEach(() => {
    getAllUsersUseCase = new GetAllUsersUseCase(mockUserRepository as UsersRepositoryInterface);
    jest.clearAllMocks();
  });

  it('should return a list of users', async () => {
    const fakeUsers: UserDTO[] = Array.from({ length: 3 }, () => {
      const fakeUser = generateFakeUserWithId();
      return new UserDTO(fakeUser._id, fakeUser.username, fakeUser.email, fakeUser.createdAt, fakeUser.updatedAt);
    });
    mockUserRepository.getAllUsers!.mockResolvedValue(fakeUsers);

    const users = await getAllUsersUseCase.execute();

    expect(users).toHaveLength(3);
    expect(users).toEqual(fakeUsers);
    expect(mockUserRepository.getAllUsers).toHaveBeenCalledTimes(1);
  });

  it('should throw a DatabaseError if repository fails', async () => {
    mockUserRepository.getAllUsers!.mockRejectedValue(new Error('Database is down'));

    const promise = getAllUsersUseCase.execute();

    await expect(promise).rejects.toThrow(DatabaseError);
    await expect(promise).rejects.toThrow('Database is down');

    expect(mockUserRepository.getAllUsers).toHaveBeenCalledTimes(1);
  });
});
