import UserRepositoryInterface from '../../domain/repositories/UserRepositoryInterface.js';
import UserDTO from '../../domain/dtos/UserDTO.js';
import DatabaseError from '../../shared/errors/DatabaseError.js';
import User from '../../domain/entities/User.js';
import bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../config/types.js';
import { ValidationError } from '../../shared/errors/index.js';

@injectable()
class CreateUserUseCase {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepositoryInterface) {}

  async execute(user: User): Promise<UserDTO> {
    if (!user.username || !user.email || !user.password) {
      throw new ValidationError('Missing required fields');
    }
    try {
      user.password = await bcrypt.hash(user.password, 10); // ! Hash the password before saving it to the database
      return await this.userRepository.createUser(user);
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}

export default CreateUserUseCase;
