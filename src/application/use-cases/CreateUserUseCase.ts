import UserRepositoryInterface from '../../domain/repositories/UserRepositoryInterface.js';
import UserDTO from '../../domain/dtos/UserDTO.js';
import DatabaseError from '../../shared/errors/DatabaseError.js';
import bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../config/types.js';
import { ValidationError } from '../../shared/errors/index.js';
import CreateUserDTO from '../../domain/dtos/CreateUserDTO.js';

@injectable()
class CreateUserUseCase {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepositoryInterface) {}

  async execute(user: CreateUserDTO): Promise<UserDTO> {
    if (!user.username || !user.email || !user.password) {
      throw new ValidationError('Missing required fields');
    }

    if (user.username.length < 3) {
      throw new ValidationError('Username must have at least 3 characters');
    }

    if (user.username.length > 20) {
      throw new ValidationError('Username must have at most 20 characters');
    }

    if (user.password.length < 6) {
      throw new ValidationError('Password must have at least 6 characters');
    }

    if (!user.email.includes('@')) {
      throw new ValidationError('Invalid email');
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
