import { Container } from 'inversify';
import { TYPES } from './types.js';
// Use Cases
import { RegisterUserUseCase, GetAllUsersUseCase, SigninUserUseCase } from '../application/use-cases/index.js';
// Controllers
import AuthController from '../interface/controllers/AuthController.js';
import UsersController from '../interface/controllers/UsersController.js';
// Repositories
import AuthRepositoryImpl from '../infrastructure/database/repositories/AuthRepositoryImpl.js';
import UsersRepositoryImpl from '../infrastructure/database/repositories/UsersRepositoryImpl.js';
import MovieRepositoryImpl from '../infrastructure/tmdb/repositories/MovieRepositoryImpl.js';
import GetMovieDetailsUseCase from '../application/use-cases/GetMovieDetailsUseCase.js';
import MovieController from '../interface/controllers/MovieController.js';

const container = new Container();

// ? Repositories
container.bind(TYPES.UsersRepository).to(UsersRepositoryImpl);
container.bind(TYPES.AuthRepository).to(AuthRepositoryImpl);
container.bind(TYPES.MovieRepository).to(MovieRepositoryImpl);

// ? Use Cases
container.bind(TYPES.GetAllUsersUseCase).to(GetAllUsersUseCase);
container.bind(TYPES.RegisterUserUseCase).to(RegisterUserUseCase);
container.bind(TYPES.SigninUserUseCase).to(SigninUserUseCase);
container.bind(TYPES.GetMovieDetailsUseCase).to(GetMovieDetailsUseCase);

// ? Controllers
container.bind(TYPES.UsersController).to(UsersController);
container.bind(TYPES.AuthController).to(AuthController);
container.bind(TYPES.MovieController).to(MovieController);

export default container;
