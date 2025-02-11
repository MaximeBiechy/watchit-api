import UsersRepositoryInterface from '../../domain/repositories/UsersRepositoryInterface';
import UserDTO from '../../domain/dtos/UserDTO.js';
import DatabaseError from '../../shared/errors/DatabaseError.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../config/types.js';

@injectable()
class GetAllUsersUseCase {
  constructor(@inject(TYPES.UsersRepository) private userRepository: UsersRepositoryInterface) {}

  async execute(): Promise<UserDTO[]> {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}

export default GetAllUsersUseCase;
