import { inject } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { UsersRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';

class GetUserSettingsUseCase {
  constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepositoryInterface) {}

  async execute(userId: string): Promise<any> {
    if (!userId) {
      throw new ValidationError('Missing required fields', 'MissingRequiredFields');
    }

    try {
      return await this.usersRepository.getUserSettings(userId);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message, error.code);
      } else {
        throw new DatabaseError('Error getting user settings' + error.message, 'GetUserSettingsError');
      }
    }
  }
}

export default GetUserSettingsUseCase;
