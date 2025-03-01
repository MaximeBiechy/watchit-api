import UsersRepositoryInterface from '../../domain/repositories/UsersRepositoryInterface';
import UserDTO from '../../domain/dtos/UserDTO.js';
import { DatabaseError } from '../../shared/errors/DatabaseError.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../config/types.js';
import User from '../../domain/entities/User.js';

@injectable()
class GetAllUsersUseCase {
  constructor(@inject(TYPES.UsersRepository) private userRepository: UsersRepositoryInterface) {}

  async execute(): Promise<UserDTO[]> {
    try {
      const users: User[] = await this.userRepository.getAllUsers();
      return users.map((user: User) => new UserDTO(user.id, user.username, user.email, user.createdAt, user.updatedAt));
    } catch (error: any) {
      throw new DatabaseError(error.message, 'DatabaseQueryError');
    }
  }
}

export default GetAllUsersUseCase;
