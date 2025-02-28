import User from '../../../../domain/entities/User.js';
import { generateFakeUserWithId } from '../../../helpers/fakeData.js';

describe('User Entity', () => {
  it('should create a user with valid data', () => {
    const fakeUserData = generateFakeUserWithId();
    const user = new User(
      fakeUserData._id,
      fakeUserData.username,
      fakeUserData.email,
      fakeUserData.createdAt,
      fakeUserData.updatedAt,
      fakeUserData.password,
    );
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(fakeUserData._id);
    expect(user.username).toBe(fakeUserData.username);
    expect(user.email).toBe(fakeUserData.email);
    expect(user.createdAt).toBe(fakeUserData.createdAt);
    expect(user.updatedAt).toBe(fakeUserData.updatedAt);
    expect(user.passwordHash).toBe(fakeUserData.password);
  });
});
