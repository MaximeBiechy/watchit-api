import { faker } from '@faker-js/faker';

const generateFakeUser = () => ({
  username: faker.internet.username(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});

export default generateFakeUser;
