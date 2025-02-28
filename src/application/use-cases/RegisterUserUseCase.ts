import UserDTO from '../../domain/dtos/UserDTO.js';
import DatabaseError from '../../shared/errors/DatabaseError.js';
import bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../config/types.js';
import { ValidationError } from '../../shared/errors/index.js';
import RegisterUserDTO from '../../domain/dtos/RegisterUserDTO';
import User from '../../domain/entities/User.js';
import AuthRepositoryInterface from '../../domain/repositories/AuthRepositoryInterface.js';

@injectable()
class RegisterUserUseCase {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepositoryInterface) {}

  async execute(registerUserDTO: RegisterUserDTO): Promise<UserDTO> {
    const { username, email, password } = registerUserDTO;

    if (!username || !email || !password) {
      throw new ValidationError('Username, email and password are required');
    }

    // ! Important to not expose that the user already exists (security issue).
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new ValidationError('Unable to create account with provided credentials');
    }

    if (password.length < 6) {
      throw new ValidationError('Password must have at least 6 characters');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user: User;
    try {
      user = User.create(username, email, hashedPassword);
    } catch (error: any) {
      throw new ValidationError('Failed to create user:' + error.message);
    }

    try {
      await this.authRepository.createUser(user);
    } catch (error: any) {
      throw new DatabaseError('Failed to save user in database:' + error.message);
    }

    return new UserDTO({
      _id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}

export default RegisterUserUseCase;
