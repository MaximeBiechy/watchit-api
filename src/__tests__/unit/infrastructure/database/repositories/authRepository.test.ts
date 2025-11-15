import { faker } from '@faker-js/faker';
import { generateFakeUserWithId } from '../../../../helpers/fakeData.js';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;
import { AuthRepositoryImpl } from '../../../../../infrastructure/database/repositories/index.js';

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
      avatar: 1,
      passwordHash: fakeUser.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      watchlist: [],
      seenMedia: [],
      settings: { language: 'en' },
    };

    const createdUser = await authRepository.createUser(user as unknown as any);

    expect(createdUser).toHaveProperty('username', user.username);
    expect(createdUser).toHaveProperty('email', user.email);
    expect(createdUser).toHaveProperty('passwordHash', (user as any).passwordHash || (user as any).password);
    expect(createdUser).toHaveProperty('createdAt', user.createdAt);
    expect(createdUser).toHaveProperty('updatedAt', user.updatedAt);
  });

  it('should throw a error if user is duplicated', async () => {
    const fakeUser = generateFakeUserWithId();
    const user = {
      id: faker.database.mongodbObjectId(),
      username: fakeUser.username,
      email: fakeUser.email,
      avatar: 1,
      passwordHash: fakeUser.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      watchlist: [],
      seenMedia: [],
      settings: { language: 'en' },
    };

    await authRepository.createUser(user as unknown as any);

    const promise = authRepository.createUser(user as unknown as any);

    await expect(promise).rejects.toThrow('E11000 duplicate key error collection');
  });

  it('should throw a ValidationError if user is missing required fields', async () => {
    const user = {
      id: faker.database.mongodbObjectId(),
      username: '',
      email: '',
      avatar: 1,
      passwordHash: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      watchlist: [],
      seenMedia: [],
      settings: { language: 'en' },
    };

    const promise = authRepository.createUser(user as unknown as any);

    await expect(promise).rejects.toThrow(ValidationError);
  });
});
