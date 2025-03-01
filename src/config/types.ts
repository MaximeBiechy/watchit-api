export const TYPES = {
  // ? Repositories
  UsersRepository: Symbol.for('UsersRepository'),
  AuthRepository: Symbol.for('AuthRepository'),

  // ? Use Cases
  GetAllUsersUseCase: Symbol.for('GetAllUsersUseCase'),
  RegisterUserUseCase: Symbol.for('RegisterUserUseCase'),
  SigninUserUseCase: Symbol.for('SigninUserUseCase'),

  // ? Controllers
  UsersController: Symbol.for('UsersController'),
  AuthController: Symbol.for('AuthController'),
};
