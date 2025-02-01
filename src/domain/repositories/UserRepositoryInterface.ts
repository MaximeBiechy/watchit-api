import UserDTO from '../dtos/UserDTO.js';

interface UserRepositoryInterface {
  getAllUsers(): Promise<UserDTO[]>;
}

export default UserRepositoryInterface;
