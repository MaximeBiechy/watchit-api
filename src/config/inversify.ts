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
  GetTopRatedMoviesUseCase,
  SearchMoviesAndActorsUseCase,
  GetMoviesByActorUseCase,
  AddToWatchlistUseCase,
  RemoveFromWatchlistUseCase,
  MarkAsSeenUseCase,
  RemoveSeenMediaUseCase,
  RateMediaUseCase,
  UpdateRatingMediaUseCase, RemoveMediaRatingUseCase,
} from '../application/use-cases/index.js';
// Controllers
import {
  UsersController,
  AuthController,
  MovieController,
  SearchController,
  UserController,
} from '../interface/controllers/index.js';
// Repositories
import {
  UsersRepositoryImpl,
  AuthRepositoryImpl,
  UserRepositoryImpl,
} from '../infrastructure/database/repositories/index.js';
import { MovieRepositoryImpl } from '../infrastructure/tmdb/repositories/index.js';

const container = new Container();

// ? Repositories
container.bind(TYPES.UsersRepository).to(UsersRepositoryImpl);
container.bind(TYPES.AuthRepository).to(AuthRepositoryImpl);
container.bind(TYPES.MovieRepository).to(MovieRepositoryImpl);
container.bind(TYPES.UserRepository).to(UserRepositoryImpl);

// ? Use Cases
container.bind(TYPES.GetAllUsersUseCase).to(GetAllUsersUseCase);
container.bind(TYPES.RegisterUserUseCase).to(RegisterUserUseCase);
container.bind(TYPES.SigninUserUseCase).to(SigninUserUseCase);
container.bind(TYPES.GetMovieDetailsUseCase).to(GetMovieDetailsUseCase);
container.bind(TYPES.GetNowPlayingMoviesUseCase).to(GetNowPlayingMoviesUseCase);
container.bind(TYPES.GetUpcomingMoviesUseCase).to(GetUpcomingMoviesUseCase);
container.bind(TYPES.GetPopularMoviesUseCase).to(GetPopularMoviesUseCase);
container.bind(TYPES.GetTopRatedMoviesUseCase).to(GetTopRatedMoviesUseCase);
container.bind(TYPES.SearchMoviesAndActorsUseCase).to(SearchMoviesAndActorsUseCase);
container.bind(TYPES.GetMoviesByActorUseCase).to(GetMoviesByActorUseCase);
container.bind(TYPES.AddToWatchlistUseCase).to(AddToWatchlistUseCase);
container.bind(TYPES.RemoveFromWatchlistUseCase).to(RemoveFromWatchlistUseCase);
container.bind(TYPES.MarkAsSeenUseCase).to(MarkAsSeenUseCase);
container.bind(TYPES.RemoveSeenMediaUseCase).to(RemoveSeenMediaUseCase);
container.bind(TYPES.RateMediaUseCase).to(RateMediaUseCase);
container.bind(TYPES.UpdateRatingMediaUseCase).to(UpdateRatingMediaUseCase);
container.bind(TYPES.RemoveMediaRatingUseCase).to(RemoveMediaRatingUseCase);

// ? Controllers
container.bind(TYPES.UsersController).to(UsersController);
container.bind(TYPES.AuthController).to(AuthController);
container.bind(TYPES.MovieController).to(MovieController);
container.bind(TYPES.SearchController).to(SearchController);
container.bind(TYPES.UserController).to(UserController);

export default container;
