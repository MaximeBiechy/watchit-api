import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { UsersRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';

@injectable()
class UpdateUserAvatarUseCase {
  constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepositoryInterface) {
  }

  async execute(userId: string, avatar: string): Promise<void> {
    if (!userId || !avatar) {
      throw new ValidationError('Invalid data', 'InvalidData');
    }

    try {
      await this.usersRepository.updateUserAvatar(userId, avatar);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message);
      }
      throw new DatabaseError('An error occurred while updating the user avatar' + error.message, 'UpdateUserAvatarError');
    }
  }
}

export default UpdateUserAvatarUseCase;
