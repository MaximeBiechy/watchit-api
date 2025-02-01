import UserRepositoryInterface from '../../../domain/repositories/UserRepositoryInterface.js';
import { UserModel } from '../models/index.js';
import UserDTO from '../../../domain/dtos/UserDTO.js';
import User from '../../../domain/entities/User.js';
import { injectable } from 'inversify';

@injectable()
class UserRepositoryImpl implements UserRepositoryInterface {
  async getAllUsers(): Promise<UserDTO[]> {
    const usersDocs = await UserModel.find().select('-password').lean();
    return usersDocs.map(
      (userDoc) =>
        new UserDTO({
          _id: userDoc._id.toString(),
          username: userDoc.username,
          email: userDoc.email,
          createdAt: userDoc.createdAt,
          updatedAt: userDoc.updatedAt,
        }),
    );
  }

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

export default UserRepositoryImpl;
