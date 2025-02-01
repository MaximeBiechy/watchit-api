import { faker } from '@faker-js/faker';
import { UserModel } from '../../../../../infrastructure/database/models/index.js';
import UserRepositoryImpl from '../../../../../infrastructure/database/repositories/UserRepositoryImpl.js';
import { generateFakeUserWithId } from '../../../../helpers/fakeData.js';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;

describe('UserRepositoryImpl', () => {
  let userRepository: UserRepositoryImpl;

  beforeAll(() => {
    userRepository = new UserRepositoryImpl();
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

  it('should create a user', async () => {
    const fakeUser = generateFakeUserWithId();
    const user = {
      username: fakeUser.username,
      email: fakeUser.email,
      password: fakeUser.password,
    };

    const createdUser = await userRepository.createUser(user);

    expect(createdUser).toHaveProperty('username', user.username);
    expect(createdUser).toHaveProperty('email', user.email);
    expect(createdUser).not.toHaveProperty('password');
  });

  it('should throw a error if user is duplicated', async () => {
    const fakeUser = generateFakeUserWithId();
    const user = {
      username: fakeUser.username,
      email: fakeUser.email,
      password: fakeUser.password,
    };

    await userRepository.createUser(user);

    const promise = userRepository.createUser(user);

    await expect(promise).rejects.toThrow('E11000 duplicate key error collection');
  });

  it('should throw a ValidationError if user is missing required fields', async () => {
    const user = {
      id: faker.database.mongodbObjectId(),
      username: '',
      email: '',
      password: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const promise = userRepository.createUser(user);

    await expect(promise).rejects.toThrow(ValidationError);
  });
});
