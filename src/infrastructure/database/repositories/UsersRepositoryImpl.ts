import UsersRepositoryInterface from '../../../domain/repositories/UsersRepositoryInterface';
import { UserModel } from '../models/index.js';
import { injectable } from 'inversify';
import User from '../../../domain/entities/User.js';

@injectable()
class UsersRepositoryImpl implements UsersRepositoryInterface {
  async getAllUsers(): Promise<User[]> {
    const usersDocs = await UserModel.find().select('-password').lean();
    return usersDocs.map((userDoc) => {
      return new User(userDoc.id, userDoc.username, userDoc.email, userDoc.createdAt, userDoc.updatedAt);
    });
  }
}

export default UsersRepositoryImpl;
