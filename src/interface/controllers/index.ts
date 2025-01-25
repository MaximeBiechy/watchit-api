import UserRepositoryImpl from '../../infrastructure/database/repositories/UserRepositoryImpl.js';
import GetAllUsersUseCase from '../../application/use-cases/GetAllUsersUseCase.js';
import UsersController from './UsersController.js';

// ? Initialize User Controller
const userRepository = new UserRepositoryImpl();
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const userController = new UsersController(getAllUsersUseCase);

// ? Initialize other controllers here

export { userController };
