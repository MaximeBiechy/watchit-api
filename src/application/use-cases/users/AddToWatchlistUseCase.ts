import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { UsersRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';

@injectable()
class AddToWatchlistUseCase {
  constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepositoryInterface) {
  }

  async execute(userId: string, mediaId: number, mediaType: 'movie' | 'tv'): Promise<void> {
    if (!userId || !mediaId) {
      throw new ValidationError('Missing required fields', 'MissingRequiredFields');
    }

    if (!['movie', 'tv'].includes(mediaType)) {
      throw new ValidationError('Invalid media media type', 'InvalidMediaType');
    }

    try {
      await this.usersRepository.addToWatchList(userId, mediaId, mediaType);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message, error.code);
      } else {
        throw new DatabaseError('Error adding to watchlist' + error.message, 'AddToWatchlistError');
      }
    }
  }
}

export default AddToWatchlistUseCase;
