import UserDTO from '../../application/dtos/UserDTO.js';

interface UserRepositoryInterface {
  getAllUsers(): Promise<UserDTO[]>;
}

export default UserRepositoryInterface;
