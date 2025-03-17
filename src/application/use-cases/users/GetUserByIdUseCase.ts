import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { UsersRepositoryInterface } from '../../../domain/repositories/index.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';
import { User } from '../../../domain/entities/index.js';

@injectable()
class GetUserByIdUseCase {
  constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepositoryInterface) {
  }

  async execute(userId: string): Promise<User | null> {
    if (!userId) {
      throw new ValidationError('Id Invalid', 'IdInvalid');
    }

    try {
      return await this.usersRepository.getUserById(userId);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(error.message, 'User not found');
      }
      throw new DatabaseError('Failed to get user informations ' + error.message, 'DatabaseQueryError');
    }
  }
}

export default GetUserByIdUseCase;
