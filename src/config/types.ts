export const TYPES = {
  // ? Repositories
  UserRepository: Symbol.for('UserRepository'),

  // ? Use Cases
  GetAllUsersUseCase: Symbol.for('GetAllUsersUseCase'),
  CreateUserUseCase: Symbol.for('CreateUserUseCase'),

  // ? Controllers
  UsersController: Symbol.for('UsersController'),
};
