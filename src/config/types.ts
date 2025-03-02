export const TYPES = {
  // ? Repositories
  UsersRepository: Symbol.for('UsersRepository'),
  AuthRepository: Symbol.for('AuthRepository'),
  MovieRepository: Symbol.for('MovieRepository'),

  // ? Use Cases
  GetAllUsersUseCase: Symbol.for('GetAllUsersUseCase'),
  RegisterUserUseCase: Symbol.for('RegisterUserUseCase'),
  SigninUserUseCase: Symbol.for('SigninUserUseCase'),
  GetMovieDetailsUseCase: Symbol.for('GetMovieDetailsUseCase'),
  GetNowPlayingMoviesUseCase: Symbol.for('GetNowPlayingMoviesUseCase'),

  // ? Controllers
  UsersController: Symbol.for('UsersController'),
  AuthController: Symbol.for('AuthController'),
  MovieController: Symbol.for('MovieController'),
};
