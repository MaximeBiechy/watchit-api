import UserDTO from '../dtos/UserDTO.js';
import User from '../entities/User.js';

interface UserRepositoryInterface {
  getAllUsers(): Promise<UserDTO[]>;
  createUser(user: User): Promise<UserDTO>;
}

export default UserRepositoryInterface;
