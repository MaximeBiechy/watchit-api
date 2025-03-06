import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { UserRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';

@injectable()
class AddToWatchlistUseCase {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepositoryInterface) {
  }

  async execute(userId: string, mediaId: string, mediaType: 'movie' | 'tv'): Promise<void> {
    if (!userId || !mediaId) {
      throw new ValidationError('Missing required fields', 'MissingRequiredFields');
    }

    if (!['movie', 'tv'].includes(mediaType)) {
      throw new ValidationError('Invalid media media type', 'InvalidMediaType');
    }

    try {
      await this.userRepository.addToWatchList(userId, String(mediaId), mediaType);
    } catch (error: NotFoundError) {
      throw new NotFoundError(error.message, error.code);
    } catch (error: any) {
      throw new DatabaseError('Error adding to watchlist' + error.message, 'AddToWatchlistError');
    }
  }
}

export default AddToWatchlistUseCase;
