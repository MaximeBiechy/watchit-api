import { UserModel } from '../../../../../infrastructure/database/models/index.js';
import UsersRepositoryImpl from '../../../../../infrastructure/database/repositories/UsersRepositoryImpl';
import { generateFakeUserWithId } from '../../../../helpers/fakeData.js';

describe('UserRepositoryImpl', () => {
  let userRepository: UsersRepositoryImpl;

  beforeAll(() => {
    userRepository = new UsersRepositoryImpl();
  });

  it('should return all users without password', async () => {
    await UserModel.create(generateFakeUserWithId());
    const users = await userRepository.getAllUsers();

    expect(users).toHaveLength(1);
    expect(users[0]).not.toHaveProperty('password');
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('username');
    expect(users[0]).toHaveProperty('email');
    expect(users[0]).toHaveProperty('createdAt');
    expect(users[0]).toHaveProperty('updatedAt');
  });

  it('should return an empty array when there are no users', async () => {
    const users = await userRepository.getAllUsers();
    expect(users).toEqual([]);
  });
});
