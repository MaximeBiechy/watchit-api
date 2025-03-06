// Users
import GetAllUsersUseCase from './users/GetAllUsersUseCase.js';
// Auth
import RegisterUserUseCase from './auth/RegisterUserUseCase.js';
import SigninUserUseCase from './auth/SigninUserUseCase.js';
// Movies
import GetMovieDetailsUseCase from './movies/GetMovieDetailsUseCase.js';
import GetNowPlayingMoviesUseCase from './movies/GetNowPlayingMoviesUseCase.js';
import GetUpcomingMoviesUseCase from './movies/GetUpcomingMoviesUseCase.js';
import GetPopularMoviesUseCase from './movies/GetPopularMoviesUseCase.js';
import GetTopRatedMoviesUseCase from './movies/GetTopRatedMoviesUseCase.js';
import SearchMoviesAndActorsUseCase from './movies/SearchMoviesAndActorsUseCase.js';
import GetMoviesByActorUseCase from './movies/GetMoviesByActorUseCase.js';
// User
import AddToWatchlistUseCase from './users/AddToWatchlistUseCase.js';
import RemoveFromWatchlistUseCase from './users/RemoveFromWatchlistUseCase.js';
import MarkAsSeenUseCase from './users/MarkAsSeenUseCase.js';
import RemoveSeenMediaUseCase from './users/RemoveSeenMediaUseCase.js';
import RateMediaUseCase from './users/RateMediaUseCase.js';
import UpdateRatingMediaUseCase from './users/UpdateRatingMediaUseCase.js';
import RemoveMediaRatingUseCase from './users/RemoveMediaRatingUseCase.js';

export {
  GetAllUsersUseCase,
  RegisterUserUseCase,
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
};
