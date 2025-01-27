import { UserModel } from '../../../infrastructure/database/models';
import request from 'supertest';
import app from '../../../app/app';
import generateFakeUser from '../../helpers/fakeData';

describe('GET /users', () => {
  beforeAll(async () => {
    const fakeUsers = Array.from({ length: 5 }, generateFakeUser);
    await UserModel.create(fakeUsers);
  }, 30000);

  it('should return a list of users without password', async () => {
    const response = await request(app).get('/api/v1/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
    expect(response.body[0]).not.toHaveProperty('password');

    response.body.forEach((user: any) => {
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('email');
      expect(user).not.toHaveProperty('password');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });
  });

  it('should return a empty list of users when there is no user', async () => {
    await UserModel.deleteMany({});

    const response = await request(app).get('/api/v1/users');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
    expect(response.body).toEqual([]);
  });
});
