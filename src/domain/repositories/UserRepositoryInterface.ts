import UserDTO from '../../application/dtos/UserDTO';

interface UserRepositoryInterface {
  getAllUsers(): Promise<UserDTO[]>;
}

export default UserRepositoryInterface;
