import { UserModel } from '../models/index.js';
import { injectable } from 'inversify';
import { User } from '../../../domain/entities/index.js';
import { AuthRepositoryInterface } from '../../../domain/repositories/index.js';

@injectable()
class AuthRepositoryImpl implements AuthRepositoryInterface {
  async createUser(user: User): Promise<User> {
    await UserModel.create(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({
      email,
    });
    return user ? new User(user.id, user.username, user.email, user.createdAt, user.updatedAt, user.passwordHash) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);
    return user ? new User(user.id, user.username, user.email, user.createdAt, user.updatedAt, user.passwordHash) : null;
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    await UserModel.updateOne({ email }, { passwordHash: newPassword });
  }

  async deleteAccount(id: string): Promise<void> {
    await UserModel.deleteOne({ _id: id });
  }
}

export default AuthRepositoryImpl;
