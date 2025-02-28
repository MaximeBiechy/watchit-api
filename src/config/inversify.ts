import { Container } from 'inversify';
import { TYPES } from './types.js';
// Use Cases
import { RegisterUserUseCase, GetAllUsersUseCase } from '../application/use-cases/index.js';
// Controllers
import AuthController from '../interface/controllers/AuthController.js';
import UsersController from '../interface/controllers/UsersController.js';
// Repositories
import AuthRepositoryImpl from '../infrastructure/database/repositories/AuthRepositoryImpl.js';
import UsersRepositoryImpl from '../infrastructure/database/repositories/UsersRepositoryImpl.js';

const container = new Container();

// ? Repositories
container.bind(TYPES.UsersRepository).to(UsersRepositoryImpl);
container.bind(TYPES.AuthRepository).to(AuthRepositoryImpl);

// ? Use Cases
container.bind(TYPES.GetAllUsersUseCase).to(GetAllUsersUseCase);
container.bind(TYPES.CreateUserUseCase).to(RegisterUserUseCase);

// ? Controllers
container.bind(TYPES.UsersController).to(UsersController);
container.bind(TYPES.AuthController).to(AuthController);

export default container;
