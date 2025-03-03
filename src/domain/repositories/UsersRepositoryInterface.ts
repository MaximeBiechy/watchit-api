import { User } from '../entities/index.js';

interface UsersRepositoryInterface {
  getAllUsers(): Promise<User[]>;
}

export default UsersRepositoryInterface;
