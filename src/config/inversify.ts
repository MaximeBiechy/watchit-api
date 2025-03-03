import { Container } from 'inversify';
import { TYPES } from './types.js';
// Use Cases
import {
  RegisterUserUseCase,
  GetAllUsersUseCase,
  SigninUserUseCase,
  GetMovieDetailsUseCase,
  GetNowPlayingMoviesUseCase,
  GetUpcomingMoviesUseCase,
  GetPopularMoviesUseCase,
} from '../application/use-cases/index.js';
// Controllers
import { UsersController, AuthController, MovieController } from '../interface/controllers/index.js';
// Repositories
import { UsersRepositoryImpl, AuthRepositoryImpl } from '../infrastructure/database/repositories/index.js';
import { MovieRepositoryImpl } from '../infrastructure/tmdb/repositories/index.js';

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
container.bind(TYPES.GetNowPlayingMoviesUseCase).to(GetNowPlayingMoviesUseCase);
container.bind(TYPES.GetUpcomingMoviesUseCase).to(GetUpcomingMoviesUseCase);
container.bind(TYPES.GetPopularMoviesUseCase).to(GetPopularMoviesUseCase);

// ? Controllers
container.bind(TYPES.UsersController).to(UsersController);
container.bind(TYPES.AuthController).to(AuthController);
container.bind(TYPES.MovieController).to(MovieController);

export default container;
