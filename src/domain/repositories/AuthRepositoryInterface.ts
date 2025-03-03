import { User } from '../entities/index.js';

interface UserRepositoryInterface {
  createUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export default UserRepositoryInterface;
