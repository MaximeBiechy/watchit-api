import { UserModel } from '../../../infrastructure/database/models/index.js';
import request from 'supertest';
import app from '../../../app/app.js';
import { generateFakeUserWithoutId } from '../../helpers/fakeData.js';

describe('GET /users', () => {
  beforeAll(async () => {
    const fakeUsers = Array.from({ length: 5 }, generateFakeUserWithoutId);
    await UserModel.create(fakeUsers);
  }, 30000);

  it('should return a list of users without password', async () => {
    const response = await request(app).get('/api/v1/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Users fetched successfully');
    expect(response.body.users).toHaveLength(5);

    response.body.users.forEach((user: never) => {
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('email');
      expect(user).not.toHaveProperty('password');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });
  });

  it('should return an empty list of users when there is no user', async () => {
    await UserModel.deleteMany({});

    const response = await request(app).get('/api/v1/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Users fetched successfully');
    expect(response.body.users).toHaveLength(0);
    expect(response.body.users).toEqual([]);
  });
});
