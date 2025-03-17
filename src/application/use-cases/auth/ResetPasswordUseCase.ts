import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { AuthRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';
import bcrypt from 'bcrypt';

@injectable()
class ResetPasswordUseCase {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepositoryInterface) {
  }

  async execute(email: string, newPassword: string): Promise<void> {
    if (!email || !newPassword) {
      throw new ValidationError('Email and new password are required', 'MissingFields');
    }

    let existingUser;
    try {
      existingUser = await this.authRepository.findByEmail(email);
    } catch (error: any) {
      throw new DatabaseError('Failed to query user by email: ' + error.message, 'DatabaseQueryError');
    }

    if (!existingUser) {
      throw new NotFoundError('User not found', 'UserNotFound');
    }

    if (newPassword.length < 6) {
      throw new ValidationError('Password must have at least 6 characters', 'WeakPassword');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
      await this.authRepository.resetPassword(email, hashedPassword);
    } catch (error: any) {
      throw new DatabaseError('Failed to reset password: ' + error.message, 'DatabaseUpdate');
    }
  }
}

export default ResetPasswordUseCase;
