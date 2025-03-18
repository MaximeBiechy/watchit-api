import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { UsersRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

@injectable()
class UpdateUserProfileUseCase {
  constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepositoryInterface) {
  }

  async execute(userId: string, data: any) {
    if (!userId) {
      throw new ValidationError('User ID is required', 'userId');
    }

    if (!data.username && !data.email && !data.password) {
      throw new ValidationError('At least one field is required to update', 'data');
    }

    if (data.username) {
      if (data.username.length < 3 || data.username.length > 20) {
        throw new ValidationError('Username must have between 3 and 20 characters');
      }
    }

    if (data.email) {
      if (!validator.isEmail(data.email)) {
        throw new ValidationError('Invalid email format', 'email');
      }

      const existingUser = await this.usersRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== userId) {
        throw new ValidationError('Email is already taken', 'email');
      }
    }

    if (data.password) {
      if (data.password.length < 6) {
        throw new ValidationError('Password must be at least 6 characters long', 'password');
      }
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      await this.usersRepository.updateUserProfile(userId, data);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError('User not found', 'UserNotFound');
      } else if (error instanceof ValidationError) {
        throw new ValidationError(error.message, 'updateUserProfileUseCase');
      }
      throw new DatabaseError('Failed to update user profile: ' + error.message, error);
    }
  }
}

export default UpdateUserProfileUseCase;
