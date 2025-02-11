export const TYPES = {
  // ? Repositories
  UsersRepository: Symbol.for('UsersRepository'),
  AuthRepository: Symbol.for('AuthRepository'),

  // ? Use Cases
  GetAllUsersUseCase: Symbol.for('GetAllUsersUseCase'),
  CreateUserUseCase: Symbol.for('CreateUserUseCase'),

  // ? Controllers
  UsersController: Symbol.for('UsersController'),
  AuthController: Symbol.for('AuthController'),
};
