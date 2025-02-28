import UserDTO from '../dtos/UserDTO.js';
import User from '../entities/User.js';

interface UserRepositoryInterface {
  createUser(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}

export default UserRepositoryInterface;
