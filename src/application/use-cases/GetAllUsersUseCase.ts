import UserRepositoryInterface from '../../domain/repositories/UserRepositoryInterface.js';
import UserDTO from '../../domain/dtos/UserDTO.js';
import DatabaseError from '../../shared/errors/DatabaseError.js';

class GetAllUsersUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(): Promise<UserDTO[]> {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}

export default GetAllUsersUseCase;
