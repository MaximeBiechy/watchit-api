import { jest } from '@jest/globals';
import UserRepositoryInterface from '../../../domain/repositories/UserRepositoryInterface.js';
import UserDTO from '../../../domain/dtos/UserDTO.js';
import DatabaseError from '../../../shared/errors/DatabaseError.js';
import GetAllUsersUseCase from '../../../application/use-cases/GetAllUsersUseCase.js';
import { generateFakeUserWithId } from '../../helpers/fakeData.js';

const mockUserRepository: Partial<jest.Mocked<UserRepositoryInterface>> = {
  getAllUsers: jest.fn(),
};

describe('GetAllUsersUseCase', () => {
  let getAllUsersUseCase: GetAllUsersUseCase;

  beforeEach(() => {
    getAllUsersUseCase = new GetAllUsersUseCase(mockUserRepository as UserRepositoryInterface);
    jest.clearAllMocks();
  });

  it('should return a list of users', async () => {
    const fakeUsers: UserDTO[] = Array.from({ length: 3 }, () => new UserDTO(generateFakeUserWithId()));

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
