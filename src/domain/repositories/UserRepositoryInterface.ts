import UserDTO from '../dtos/UserDTO.js';
import CreateUserDTO from '../dtos/CreateUserDTO.js';

interface UserRepositoryInterface {
  getAllUsers(): Promise<UserDTO[]>;
  createUser(user: CreateUserDTO): Promise<UserDTO>;
}

export default UserRepositoryInterface;
