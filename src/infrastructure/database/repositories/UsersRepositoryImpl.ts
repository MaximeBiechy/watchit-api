import UsersRepositoryInterface from '../../../domain/repositories/UsersRepositoryInterface';
import { UserModel } from '../models/index.js';
import UserDTO from '../../../domain/dtos/UserDTO.js';
import { injectable } from 'inversify';

@injectable()
class UsersRepositoryImpl implements UsersRepositoryInterface {
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
}

export default UsersRepositoryImpl;
