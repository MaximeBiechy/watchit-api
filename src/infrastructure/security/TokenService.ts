import jwt, { JwtPayload } from 'jsonwebtoken';

export type TokenPayload = JwtPayload & { userId: string };

class TokenService {
  private static readonly ACCESS_SECRET = process.env.ACCESS_SECRET || 'secret';
  private static readonly REFRESH_SECRET = process.env.REFRESH_SECRET || 'refreshSecret';
  private static readonly ACCESS_EXPIRATION = '15m';
  private static readonly REFRESH_EXPIRATION = '7d';

  static generateTokens(userId: string) {
    const accessToken = jwt.sign({ userId }, this.ACCESS_SECRET, { expiresIn: this.ACCESS_EXPIRATION });
    const refreshToken = jwt.sign({ userId }, this.REFRESH_SECRET, { expiresIn: this.REFRESH_EXPIRATION });

    return { accessToken, refreshToken };
  }

  static verifyAccessToken(accessToken: string): TokenPayload {
    return jwt.verify(accessToken, this.ACCESS_SECRET) as TokenPayload;
  }

  static verifyRefreshToken(refreshToken: string): TokenPayload {
    return jwt.verify(refreshToken, this.REFRESH_SECRET) as TokenPayload;
  }
}

export default TokenService;
