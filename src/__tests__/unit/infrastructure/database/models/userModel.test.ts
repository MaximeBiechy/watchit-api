import { faker } from '@faker-js/faker';
import { UserModel } from '../../../../../infrastructure/database/models/index.js';
import { generateFakeUserWithId } from '../../../../helpers/fakeData.js';

describe('UserModel', () => {
  beforeAll(async () => {
    await UserModel.deleteMany({});
    await UserModel.ensureIndexes();
  });

  it('should create a user successfully', async () => {
    const user = await UserModel.create(generateFakeUserWithId());
    expect(user._id).toBeDefined();
    expect(typeof user.username).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(typeof user.password).toBe('string');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should enforce unique email constraint', async () => {
    const email = faker.internet.email();

    await UserModel.create({
      username: faker.internet.username(),
      email,
      password: faker.internet.password(),
    });

    await expect(
      UserModel.create({
        username: faker.internet.username(),
        email, // ? same email as the previous user to force the error
        password: faker.internet.password(),
      }),
    ).rejects.toThrow();
  });

  it('should enforce unique username constraint', async () => {
    const username = faker.internet.username();

    await UserModel.create({
      username,
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await expect(
      UserModel.create({
        username, // ? same username as the previous user to force the error
        email: faker.internet.email(),
        password: faker.internet.password(),
      }),
    ).rejects.toThrow();
  });
});
