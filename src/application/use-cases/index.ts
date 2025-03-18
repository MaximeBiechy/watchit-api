// Users
import GetAllUsersUseCase from './users/GetAllUsersUseCase.js';
import GetUserByIdUseCase from './users/GetUserByIdUseCase.js';
import AddToWatchlistUseCase from './users/AddToWatchlistUseCase.js';
import RemoveFromWatchlistUseCase from './users/RemoveFromWatchlistUseCase.js';
import MarkAsSeenUseCase from './users/MarkAsSeenUseCase.js';
import RemoveSeenMediaUseCase from './users/RemoveSeenMediaUseCase.js';
import RateMediaUseCase from './users/RateMediaUseCase.js';
import UpdateRatingMediaUseCase from './users/UpdateRatingMediaUseCase.js';
import RemoveMediaRatingUseCase from './users/RemoveMediaRatingUseCase.js';
import GetUserSettingsUseCase from './users/GetUserSettingsUseCase.js';
import UpdateUserSettingUseCase from './users/UpdateUserSettingUseCase.js';
import GetUserWatchListUseCase from './users/GetUserWatchListUseCase.js';
import GetUserSeenMediaUseCase from './users/GetUserSeenMediaUseCase.js';
import UpdateUserAvatarUseCase from './users/UpdateUserAvatarUseCase.js';
// Auth
import RegisterUserUseCase from './auth/RegisterUserUseCase.js';
import SigninUserUseCase from './auth/SigninUserUseCase.js';
import RefreshTokenUseCase from './auth/RefreshTokenUseCase.js';
import ResetPasswordUseCase from './auth/ResetPasswordUseCase.js';
import DeleteAccountUseCase from './auth/DeleteAccountUseCase.js'
// Movies
import GetMovieDetailsUseCase from './movies/GetMovieDetailsUseCase.js';
import GetNowPlayingMoviesUseCase from './movies/GetNowPlayingMoviesUseCase.js';
import GetUpcomingMoviesUseCase from './movies/GetUpcomingMoviesUseCase.js';
import GetPopularMoviesUseCase from './movies/GetPopularMoviesUseCase.js';
import GetTopRatedMoviesUseCase from './movies/GetTopRatedMoviesUseCase.js';
import SearchMoviesAndActorsUseCase from './movies/SearchMoviesAndActorsUseCase.js';
import GetMoviesByActorUseCase from './actors/GetMoviesByActorUseCase.js';
import GetMovieTrailerUseCase from './movies/GetMovieTrailerUseCase.js';
// User

export {
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  RegisterUserUseCase,
  SigninUserUseCase,
  ResetPasswordUseCase,
  DeleteAccountUseCase,
  RefreshTokenUseCase,
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
  GetMovieTrailerUseCase,
  UpdateUserAvatarUseCase,
};
