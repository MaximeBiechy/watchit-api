import { faker } from '@faker-js/faker';
import { generateFakeUserWithId } from '../../../../helpers/fakeData.js';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;
import AuthRepositoryImpl from '../../../../../infrastructure/database/repositories/AuthRepositoryImpl';

describe('AuthRepositoryImpl', () => {
  let authRepository: AuthRepositoryImpl;

  beforeAll(() => {
    authRepository = new AuthRepositoryImpl();
  });

  it('should create a user', async () => {
    const fakeUser = generateFakeUserWithId();
    const user = {
      id: faker.database.mongodbObjectId(),
      username: fakeUser.username,
      email: fakeUser.email,
      password: fakeUser.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdUser = await authRepository.createUser(user);

    expect(createdUser).toHaveProperty('username', user.username);
    expect(createdUser).toHaveProperty('email', user.email);
    expect(createdUser).toHaveProperty('password', user.password);
    expect(createdUser).toHaveProperty('createdAt', user.createdAt);
    expect(createdUser).toHaveProperty('updatedAt', user.updatedAt);
  });

  it('should throw a error if user is duplicated', async () => {
    const fakeUser = generateFakeUserWithId();
    const user = {
      id: faker.database.mongodbObjectId(),
      username: fakeUser.username,
      email: fakeUser.email,
      password: fakeUser.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await authRepository.createUser(user);

    const promise = authRepository.createUser(user);

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

    const promise = authRepository.createUser(user);

    await expect(promise).rejects.toThrow(ValidationError);
  });
});
