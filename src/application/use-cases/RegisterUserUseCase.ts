import UserDTO from '../../domain/dtos/UserDTO.js';
import bcrypt from 'bcrypt';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../config/types.js';
import { ValidationError, DatabaseError } from '../../shared/errors/index.js';
import RegisterUserDTO from '../../domain/dtos/RegisterUserDTO';
import User from '../../domain/entities/User.js';
import AuthRepositoryInterface from '../../domain/repositories/AuthRepositoryInterface.js';

@injectable()
class RegisterUserUseCase {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepositoryInterface) {}

  async execute(registerUserDTO: RegisterUserDTO): Promise<UserDTO> {
    const { username, email, password } = registerUserDTO;

    if (!username || !email || !password) {
      throw new ValidationError('Username, email and password are required', 'MissingFields');
    }

    // ! Important to not expose that the user already exists (security issue).
    let existingUser;
    try {
      existingUser = await this.authRepository.findByEmail(email);
    } catch (error: any) {
      throw new DatabaseError('Failed to query user by email: ' + error.message, 'DatabaseQueryError');
    }

    if (existingUser) {
      throw new ValidationError('Unable to create account with provided credentials', 'AccountCreationError');
    }

    if (password.length < 6) {
      throw new ValidationError('Password must have at least 6 characters', 'WeakPassword');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user: User;
    try {
      user = User.create(username, email, hashedPassword);
    } catch (error: any) {
      throw new ValidationError('Failed to create user:' + error.message, 'UserCreationError');
    }

    try {
      await this.authRepository.createUser(user);
    } catch (error: any) {
      throw new DatabaseError('Failed to save user in database:' + error.message, 'DatabaseSaveError');
    }

    return new UserDTO(user.id, user.username, user.email, user.createdAt, user.updatedAt);
  }
}

export default RegisterUserUseCase;
