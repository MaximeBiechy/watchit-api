import UserDTO from '../dtos/UserDTO.js';

interface UsersRepositoryInterface {
  getAllUsers(): Promise<UserDTO[]>;
}

export default UsersRepositoryInterface;
