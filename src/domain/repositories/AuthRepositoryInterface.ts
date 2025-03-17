import { User } from '../entities/index.js';

interface AuthRepositoryInterface {
  createUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  resetPassword(email: string, newPassword: string): Promise<void>;
  deleteAccount(id: string): Promise<void>;
}

export default AuthRepositoryInterface;
