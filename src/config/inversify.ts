import { Container } from 'inversify';
import { TYPES } from './types.js';
import UserRepositoryImpl from '../infrastructure/database/repositories/UserRepositoryImpl.js';
import { CreateUserUseCase, GetAllUsersUseCase } from '../application/use-cases/index.js';
import UsersController from '../interface/controllers/UsersController.js';

const container = new Container();

// ? Repositories
container.bind(TYPES.UserRepository).to(UserRepositoryImpl);

// ? Use Cases
container.bind(TYPES.GetAllUsersUseCase).to(GetAllUsersUseCase);
container.bind(TYPES.CreateUserUseCase).to(CreateUserUseCase);

// ? Controllers
container.bind(TYPES.UsersController).to(UsersController);

export default container;
