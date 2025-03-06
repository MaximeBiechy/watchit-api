import { injectable } from 'inversify';
import { UserRepositoryInterface } from '../../../domain/repositories/index.js';

@injectable()
class UserRepositoryImpl implements UserRepositoryInterface {}

export default UserRepositoryImpl;
