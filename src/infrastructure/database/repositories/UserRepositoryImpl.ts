import { injectable } from 'inversify';
import { UserRepositoryInterface } from '../../../domain/repositories/index.js';
import { Promise } from 'mongoose';
import { NotFoundError, ValidationError } from '../../../shared/errors/index.js';
import { UserModel } from '../models/index.js';

@injectable()
class UserRepositoryImpl implements UserRepositoryInterface {
  async addToWatchList(userId: string, mediaId: string, type: 'movie' | 'tv'): Promise<void> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', 'UserNotFound');
    }

    const isInWatchlist = user.watchlist.some((item) => item.mediaId === mediaId && item.type === type);
    const isInSeenMedia = user.seenMedia.some((item) => item.mediaId === mediaId && item.type === type);

    if (isInWatchlist) {
      throw new ValidationError('Media already in watchlist', 'MediaAlreadyInWatchlist');
    }

    if (isInSeenMedia) {
      throw new ValidationError('Media already in seen list', 'MediaAlreadyInSeenList');
    }

    user.watchlist.push({ mediaId, type });
    await user.save();
  }

  async removeFromWatchList(userId: string, mediaId: string, type: 'movie' | 'tv'): Promise<void> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', 'UserNotFound');
    }

    const initialLength = user.watchlist.length;
    user.watchlist = user.watchlist.filter((item) => !(item.mediaId === mediaId && item.type === type));

    if (user.watchlist.length === initialLength) {
      throw new NotFoundError('Media not found in watchlist', 'MediaNotInWatchlist');
    }

    await user.save();
  }
}

export default UserRepositoryImpl;
