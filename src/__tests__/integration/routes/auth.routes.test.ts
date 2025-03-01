import { UserModel } from '../../../infrastructure/database/models/index.js';
import request from 'supertest';
import app from '../../../app/app.js';
import { generateFakeUserWithoutId } from '../../helpers/fakeData.js';

describe('POST /auth', () => {
  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  it('should create a new user and return it without password', async () => {
    const newUser = generateFakeUserWithoutId();
    const response = await request(app).post('/api/v1/auth/register').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'User created successfully');
    expect(response.body.user).toHaveProperty('username', newUser.username);
    expect(response.body.user).toHaveProperty('email', newUser.email);
    expect(response.body.user).not.toHaveProperty('password');
    expect(response.body.user).toHaveProperty('createdAt');
    expect(response.body.user).toHaveProperty('updatedAt');

    const userInDb = await UserModel.findOne({ email: newUser.email }).lean();
    expect(userInDb).toBeTruthy();
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({});

    expect(response.status).toBe(400);
  });

  it('should sign in a user and return it without password', async () => {
    const newUser = generateFakeUserWithoutId();
    await UserModel.create(newUser);
    const response = await request(app).post('/api/v1/auth/signin').send({
      email: newUser.email,
      password: newUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'User signed in successfully');
    expect(response.body.user).toHaveProperty('username', newUser.username);
    expect(response.body.user).toHaveProperty('email', newUser.email);
    expect(response.body.user).toHaveProperty('accessToken');
    expect(response.body.user).toHaveProperty('refreshToken');
    expect(response.body.user).not.toHaveProperty('password');
  });

  it('should return 400 if credentials are invalid', async () => {
    const newUser = generateFakeUserWithoutId();
    await UserModel.create(newUser);
    const response = await request(app).post('/api/v1/auth/signin').send({
      email: 'invalid-email',
      password: 'invalid-password',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', 'error');
  });
});
