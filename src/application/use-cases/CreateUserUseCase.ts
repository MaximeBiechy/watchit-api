import UserDTO from '../../domain/dtos/UserDTO.js';
import DatabaseError from '../../shared/errors/DatabaseError.js';
import bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../config/types.js';
import { ValidationError } from '../../shared/errors/index.js';
import CreateUserDTO from '../../domain/dtos/CreateUserDTO.js';
import User from '../../domain/entities/User.js';
import AuthRepositoryInterface from '../../domain/repositories/AuthRepositoryInterface.js';

@injectable()
class CreateUserUseCase {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepositoryInterface) {}

  async execute(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    if (!createUserDTO.username || !createUserDTO.email || !createUserDTO.password) {
      throw new ValidationError('Missing required fields');
    }

    if (createUserDTO.username.length < 3) {
      throw new ValidationError('Username must have at least 3 characters');
    }

    if (createUserDTO.username.length > 20) {
      throw new ValidationError('Username must have at most 20 characters');
    }

    if (createUserDTO.password.length < 6) {
      throw new ValidationError('Password must have at least 6 characters');
    }

    if (!createUserDTO.email.includes('@')) {
      throw new ValidationError('Invalid email');
    }

    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
    const user = new User('', createUserDTO.username, createUserDTO.email, hashedPassword, new Date(), new Date());

    try {
      return await this.authRepository.createUser(user);
    } catch (error: any) {
      throw new DatabaseError(error.message);
    }
  }
}

export default CreateUserUseCase;
