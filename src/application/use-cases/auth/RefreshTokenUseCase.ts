import { inject, injectable } from 'inversify';
import { TYPES } from '../../../config/types.js';
import { AuthRepositoryInterface } from '../../../domain/repositories/index.js';
import { SigninUserResponseDTO } from '../../../domain/dtos/index.js';
import TokenService from '../../../infrastructure/security/TokenService.js';
import { DatabaseError, NotFoundError, ValidationError } from '../../../shared/errors/index.js';

@injectable()
class RefreshTokenUseCase {
  constructor(@inject(TYPES.AuthRepository) private authRepository: AuthRepositoryInterface) {
  }

  async execute(refreshToken: string): Promise<SigninUserResponseDTO> {
    if (!refreshToken) {
      throw new ValidationError('Refresh token is required', 'RefreshTokenRequiredError');
    }

    const decodedToken = TokenService.verifyRefreshToken(refreshToken);

    try {
      const user = await this.authRepository.findById(decodedToken.userId);

      if (!user) {
        throw new NotFoundError('User not found', 'UserNotFoundError');
      }

      const tokens = TokenService.generateTokens(user.id);

      return new SigninUserResponseDTO(
        user.id,
        user.username,
        user.email,
        tokens.accessToken,
        tokens.refreshToken,
      );
    } catch (error: any) {
      if (error instanceof DatabaseError) {
        throw new DatabaseError(error.message, error.code);
      }
    }
  }
}

export default RefreshTokenUseCase;
