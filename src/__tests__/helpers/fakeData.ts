import { faker } from '@faker-js/faker';

const generateFakeUserWithoutId = () => ({
  username: faker.internet.username(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});

const generateFakeUserWithId = () => ({
  _id: faker.database.mongodbObjectId(),
  username: faker.internet.username(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});

export { generateFakeUserWithoutId, generateFakeUserWithId };
