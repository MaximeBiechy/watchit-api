import { UserModel } from '../models/index.js';
import UserDTO from '../../../domain/dtos/UserDTO.js';
import { injectable } from 'inversify';
import User from '../../../domain/entities/User.js';
import AuthRepositoryInterface from '../../../domain/repositories/AuthRepositoryInterface.js';

@injectable()
class AuthRepositoryImpl implements AuthRepositoryInterface {
  async createUser(user: User): Promise<UserDTO> {
    const userDoc = await UserModel.create(user);
    return new UserDTO({
      _id: userDoc.id,
      username: userDoc.username,
      email: userDoc.email,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt,
    });
  }
}

export default AuthRepositoryImpl;
