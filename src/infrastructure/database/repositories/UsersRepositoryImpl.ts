import { UsersRepositoryInterface } from '../../../domain/repositories/index.js';
import { UserModel } from '../models/index.js';
import { injectable } from 'inversify';
import { User } from '../../../domain/entities/index.js';

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
