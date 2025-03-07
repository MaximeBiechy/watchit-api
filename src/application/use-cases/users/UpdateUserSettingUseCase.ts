import { inject } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { UsersRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';
import { User } from '../../../domain/entities/index.js';


class UpdateUserSettingUseCase {
  constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepositoryInterface) {
  }

  async execute(userId: string, setting: User['settings']): Promise<void> {
    if (!userId || !setting) {
      throw new ValidationError('Missing required fields', 'MissingRequiredFields');
    }

    try {
      await this.usersRepository.updateUserSettings(userId, setting);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message, error.code);
      } else {
        throw new DatabaseError('Error updating user settings' + error.message, 'UpdateUserSettingsError');
      }
    }
  }
}

export default UpdateUserSettingUseCase;
