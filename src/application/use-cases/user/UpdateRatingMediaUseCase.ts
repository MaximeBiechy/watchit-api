import { inject } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { UserRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';

class UpdateRatingMediaUseCase {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepositoryInterface) {
  }

  async execute(userId: string, mediaId: string, mediaType: 'movie' | 'tv', rating: number): Promise<void> {
    if (!userId || !mediaId || !rating) {
      throw new ValidationError('Missing required fields', 'MissingRequiredFields');
    }

    if (!['movie', 'tv'].includes(mediaType)) {
      throw new ValidationError('Invalid media media type', 'InvalidMediaType');
    }

    try {
      await this.userRepository.updateRatingMedia(userId, String(mediaId), mediaType, rating);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message, error.code);
      } else {
        throw new DatabaseError('Error rating media' + error.message, 'RateMediaError');
      }
    }
  }
}

export default UpdateRatingMediaUseCase;
