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
    expect(response.body).toHaveLength(5);

    response.body.forEach((user: never) => {
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

describe('POST /users', () => {
  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  it('should create a new user and return it without password', async () => {
    const newUser = generateFakeUserWithoutId();

    const response = await request(app).post('/api/v1/auth/register').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', newUser.username);
    expect(response.body).toHaveProperty('email', newUser.email);
    expect(response.body).not.toHaveProperty('password');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');

    const userInDb = await UserModel.findOne({ email: newUser.email }).lean();
    expect(userInDb).toBeTruthy();
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({});

    expect(response.status).toBe(400);
  });
});
