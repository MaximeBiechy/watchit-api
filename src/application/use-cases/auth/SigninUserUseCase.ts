import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { AuthRepositoryInterface } from '../../../domain/repositories/index.js';
import bcrypt from 'bcrypt';
import TokenService from '../../../infrastructure/security/TokenService.js';
import { DatabaseError, ValidationError } from '../../../shared/errors/index.js';
import { SigninUserDTO, SigninUserResponseDTO } from '../../../domain/dtos/index.js';

@injectable()
class SigninUserUseCase {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepositoryInterface) {}

  async execute(signinUserDTO: SigninUserDTO): Promise<SigninUserResponseDTO> {
    const { email, password } = signinUserDTO;

    let existingUser;
    try {
      existingUser = await this.authRepository.findByEmail(email);
    } catch (error: any) {
      throw new DatabaseError('Failed to query user by email: ' + error.message, 'DatabaseQueryError');
    }

    if (!existingUser) {
      throw new ValidationError('Invalid credentials', 'InvalidCredentials');
    }

    if (existingUser.passwordHash) {
      const passwordMatch = await bcrypt.compare(password, existingUser.passwordHash);
      if (!passwordMatch) {
        throw new ValidationError('Invalid credentials', 'InvalidCredentials');
      }
    }

    const tokens = TokenService.generateTokens(existingUser.id);

    return new SigninUserResponseDTO(
      existingUser.id,
      existingUser.username,
      existingUser.email,
      tokens.accessToken,
      tokens.refreshToken,
    );
  }
}

export default SigninUserUseCase;
