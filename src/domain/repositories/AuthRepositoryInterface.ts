import UserDTO from '../dtos/UserDTO.js';
import User from '../entities/User.js';

interface UserRepositoryInterface {
  createUser(user: User): Promise<UserDTO>;
  userExists(username: string, email: string): Promise<boolean>;
}

export default UserRepositoryInterface;
