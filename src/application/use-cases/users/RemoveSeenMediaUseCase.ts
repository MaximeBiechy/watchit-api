import { inject } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { UsersRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';

class RemoveSeenMediaUseCase {
  constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepositoryInterface) {
  }

  async execute(userId: string, mediaId: string, mediaType: 'movie' | 'tv'): Promise<void> {
    if (!userId || !mediaId) {
      throw new ValidationError('Missing required fields', 'MissingRequiredFields');
    }

    if (!['movie', 'tv'].includes(mediaType)) {
      throw new ValidationError('Invalid media media type', 'InvalidMediaType');
    }

    try {
      await this.usersRepository.removeSeenMedia(userId, String(mediaId), mediaType);
    } catch (error: NotFoundError) {
      throw new NotFoundError(error.message, error.code);
    } catch (error: any) {
      throw new DatabaseError('Error removing from seen list' + error.message, 'RemoveFromSeenListError');
    }
  }
}

export default RemoveSeenMediaUseCase;
