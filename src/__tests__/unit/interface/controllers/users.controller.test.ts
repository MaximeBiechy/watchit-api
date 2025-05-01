import { Request, Response, NextFunction } from 'express';
import { jest } from '@jest/globals';
import {
  AddToWatchlistUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  MarkAsSeenUseCase,
  RateMediaUseCase,
  RemoveFromWatchlistUseCase,
  RemoveMediaRatingUseCase,
  RemoveSeenMediaUseCase,
  UpdateRatingMediaUseCase,
  GetUserSettingsUseCase,
  UpdateUserSettingUseCase,
  GetUserWatchListUseCase,
  GetUserSeenMediaUseCase,
  DeleteAccountUseCase,
  UpdateUserAvatarUseCase,
  UpdateUserProfileUseCase,
} from '../../../../application/use-cases/index.js';
import UsersController from '../../../../interface/controllers/UsersController.js';
import UserDTO from '../../../../domain/dtos/users/UserDTO';
import { generateFakeUserWithId } from '../../../helpers/fakeData.js';

describe('UsersController', () => {
  let usersController: UsersController;
  let getAllUsersUseCase: GetAllUsersUseCase;
  let addToWatchlistUseCase: AddToWatchlistUseCase;
  let removeFromWatchlistUseCase: RemoveFromWatchlistUseCase;
  let markAsSeenUseCase: MarkAsSeenUseCase;
  let removeSeenMediaUseCase: RemoveSeenMediaUseCase;
  let rateMediaUseCase: RateMediaUseCase;
  let updateRatingMediaUseCase: UpdateRatingMediaUseCase;
  let removeMediaRatingUseCase: RemoveMediaRatingUseCase;
  let getUserSettingsUseCase: GetUserSettingsUseCase;
  let updateUserSettingUseCase: UpdateUserSettingUseCase;
  let getUserWatchListUseCase: GetUserWatchListUseCase;
  let getUserSeenMediaUseCase: GetUserSeenMediaUseCase;
  let deleteAccountUseCase: DeleteAccountUseCase;
  let getUserByIdUseCase: GetUserByIdUseCase;
  let updateUserAvatarUseCase: UpdateUserAvatarUseCase;
  let updateUserProfileUseCase: UpdateUserProfileUseCase;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    getAllUsersUseCase = new GetAllUsersUseCase({} as never);
    addToWatchlistUseCase = new AddToWatchlistUseCase({} as never);
    removeFromWatchlistUseCase = new RemoveFromWatchlistUseCase({} as never);
    markAsSeenUseCase = new MarkAsSeenUseCase({} as never);
    removeSeenMediaUseCase = new RemoveSeenMediaUseCase({} as never);
    rateMediaUseCase = new RateMediaUseCase({} as never);
    updateRatingMediaUseCase = new UpdateRatingMediaUseCase({} as never);
    removeMediaRatingUseCase = new RemoveMediaRatingUseCase({} as never);
    getUserSettingsUseCase = new GetUserSettingsUseCase({} as never);
    updateUserSettingUseCase = new UpdateUserSettingUseCase({} as never);
    getUserWatchListUseCase = new GetUserWatchListUseCase({} as never);
    getUserSeenMediaUseCase = new GetUserSeenMediaUseCase({} as never);
    deleteAccountUseCase = new DeleteAccountUseCase({} as never);
    getUserByIdUseCase = new GetUserByIdUseCase({} as never);
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase({} as never);
    updateUserProfileUseCase = new UpdateUserProfileUseCase({} as never);
    usersController = new UsersController(
      getAllUsersUseCase,
      addToWatchlistUseCase,
      removeFromWatchlistUseCase,
      markAsSeenUseCase,
      removeSeenMediaUseCase,
      rateMediaUseCase,
      updateRatingMediaUseCase,
      removeMediaRatingUseCase,
      getUserSettingsUseCase,
      updateUserSettingUseCase,
      getUserWatchListUseCase,
      getUserSeenMediaUseCase,
      deleteAccountUseCase,
      getUserByIdUseCase,
      updateUserAvatarUseCase,
      updateUserProfileUseCase,
    );

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    next = jest.fn();
  });

  it('should return 200 and the list of users', async () => {
    const fakeUser = generateFakeUserWithId();
    const users: UserDTO[] = [
      new UserDTO(fakeUser._id, fakeUser.username, fakeUser.email, fakeUser.createdAt, fakeUser.updatedAt),
    ];
    jest.spyOn(getAllUsersUseCase, 'execute').mockResolvedValue(users);

    await usersController.getAllUsers(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      users,
      message: 'Users fetched successfully',
    });
  });

  it('should call next with an error if the use case throws', async () => {
    const error = new Error('Something went wrong');
    jest.spyOn(getAllUsersUseCase, 'execute').mockRejectedValue(error);

    await usersController.getAllUsers(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
