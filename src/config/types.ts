export const TYPES = {
  // ? Repositories
  UsersRepository: Symbol.for('UsersRepository'),
  AuthRepository: Symbol.for('AuthRepository'),
  MovieRepository: Symbol.for('MovieRepository'),
  UserRepository: Symbol.for('UserRepository'),

  // ? Use Cases
  GetAllUsersUseCase: Symbol.for('GetAllUsersUseCase'),
  RegisterUserUseCase: Symbol.for('RegisterUserUseCase'),
  SigninUserUseCase: Symbol.for('SigninUserUseCase'),
  GetMovieDetailsUseCase: Symbol.for('GetMovieDetailsUseCase'),
  GetNowPlayingMoviesUseCase: Symbol.for('GetNowPlayingMoviesUseCase'),
  GetUpcomingMoviesUseCase: Symbol.for('GetUpcomingMoviesUseCase'),
  GetPopularMoviesUseCase: Symbol.for('GetPopularMoviesUseCase'),
  GetTopRatedMoviesUseCase: Symbol.for('GetTopRatedMoviesUseCase'),
  SearchMoviesAndActorsUseCase: Symbol.for('SearchMoviesAndActorsUseCase'),
  GetMoviesByActorUseCase: Symbol.for('GetMoviesByActorUseCase'),
  AddToWatchlistUseCase: Symbol.for('AddToWatchlistUseCase'),
  RemoveFromWatchlistUseCase: Symbol.for('RemoveFromWatchlistUseCase'),

  // ? Controllers
  UsersController: Symbol.for('UsersController'),
  AuthController: Symbol.for('AuthController'),
  MovieController: Symbol.for('MovieController'),
  SearchController: Symbol.for('SearchController'),
  UserController: Symbol.for('UserController'),
};
