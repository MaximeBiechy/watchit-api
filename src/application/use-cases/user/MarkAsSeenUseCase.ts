import { inject } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { UserRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';

class MarkAsSeenUseCase {
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
      await this.userRepository.markAsSeen(userId, String(mediaId), mediaType);
    } catch (error: NotFoundError) {
      throw new NotFoundError(error.message, error.code);
    } catch (error: any) {
      throw new DatabaseError('Error marking as seen' + error.message, 'MarkAsSeenError');
    }

  }
}

export default MarkAsSeenUseCase;
