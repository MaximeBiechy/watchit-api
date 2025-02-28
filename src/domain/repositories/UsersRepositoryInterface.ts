import User from '../entities/User.js';

interface UsersRepositoryInterface {
  getAllUsers(): Promise<User[]>;
}

export default UsersRepositoryInterface;
