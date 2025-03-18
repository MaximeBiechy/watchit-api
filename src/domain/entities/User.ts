import { ValidationError } from '../../shared/errors/index.js';

class User {
  constructor(
    public readonly id: string,
    public username: string,
    public email: string,
    public avatar: number,
    public createdAt: Date,
    public updatedAt: Date,
    public passwordHash?: string,
  ) {}

  static create(username: string, email: string, passwordHash?: string): User {
    if (!username || username.length < 3 || username.length > 20) {
      throw new ValidationError('Username must have between 3 and 20 characters');
    }

    if (!passwordHash) {
      throw new ValidationError('Password hash is required');
    }

    const now = new Date();
    const id = crypto.randomUUID();

    return new User(id, username, email, 1, now, now, passwordHash);
  }
}

export default User;
