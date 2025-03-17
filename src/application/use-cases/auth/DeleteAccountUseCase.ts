import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { AuthRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';

@injectable()
class DeleteAccountUseCase {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepositoryInterface) {
  }

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new ValidationError('Id invalid', 'IdInvalid');
    }

    let existingUser;
    try {
      existingUser = await this.authRepository.findById(id);
    } catch (error: any) {
      throw new DatabaseError('Failed to query user by id: ' + error.message, 'DatabaseQueryError');
    }

    if (!existingUser) {
      throw new NotFoundError('User not found', 'UserNotFound');
    }

    try {
      await this.authRepository.deleteAccount(id);
    } catch (error: any) {
      throw new DatabaseError('Failed to delete account: ' + error.message, 'DatabaseDeleteError');
    }
  }
}

export default DeleteAccountUseCase;
