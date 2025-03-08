import { inject } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { UsersRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';

class GetUserSeenMediaUseCase {
  constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepositoryInterface) {
  }

  async execute(userId: string) {
    if (!userId) {
      throw new ValidationError('User ID is required', 'ValidationError');
    }

    try {
      return await this.usersRepository.getUserSeenMedia(userId);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message, error.code);
      } else {
        throw new DatabaseError('Error getting user watchlist' + error.message, 'DatabaseError');
      }
    }
  }
}
