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
  UpdateRatingMediaUseCase,
  RemoveMediaRatingUseCase,
  GetUserSettingsUseCase,
  UpdateUserSettingUseCase,
  GetUserWatchListUseCase,
  GetUserSeenMediaUseCase,
  RefreshTokenUseCase, GetMovieTrailerUseCase,
} from '../application/use-cases/index.js';
// Controllers
import {
  UsersController,
  AuthController,
  MoviesController,
  SearchController,
  UserController,
  ActorsController,
} from '../interface/controllers/index.js';
// Repositories
import {
  UsersRepositoryImpl,
  AuthRepositoryImpl,
  UserRepositoryImpl,
  ActorsRepositoryImpl,
} from '../infrastructure/database/repositories/index.js';
import { MoviesRepositoryImpl } from '../infrastructure/tmdb/repositories/index.js';

const container = new Container();

// ? Repositories
container.bind(TYPES.UsersRepository).to(UsersRepositoryImpl);
container.bind(TYPES.AuthRepository).to(AuthRepositoryImpl);
container.bind(TYPES.MoviesRepository).to(MoviesRepositoryImpl);
container.bind(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind(TYPES.ActorsRepository).to(ActorsRepositoryImpl);

// ? Use Cases
container.bind(TYPES.GetAllUsersUseCase).to(GetAllUsersUseCase);
container.bind(TYPES.RegisterUserUseCase).to(RegisterUserUseCase);
container.bind(TYPES.SigninUserUseCase).to(SigninUserUseCase);
container.bind(TYPES.RefreshTokenUseCase).to(RefreshTokenUseCase);
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
container.bind(TYPES.GetUserSettingsUseCase).to(GetUserSettingsUseCase);
container.bind(TYPES.UpdateUserSettingUseCase).to(UpdateUserSettingUseCase);
container.bind(TYPES.GetUserWatchListUseCase).to(GetUserWatchListUseCase);
container.bind(TYPES.GetUserSeenMediaUseCase).to(GetUserSeenMediaUseCase);
container.bind(TYPES.GetMovieTrailerUseCase).to(GetMovieTrailerUseCase);

// ? Controllers
container.bind(TYPES.UsersController).to(UsersController);
container.bind(TYPES.AuthController).to(AuthController);
container.bind(TYPES.MoviesController).to(MoviesController);
container.bind(TYPES.SearchController).to(SearchController);
container.bind(TYPES.UserController).to(UserController);
container.bind(TYPES.ActorsController).to(ActorsController);

export default container;
