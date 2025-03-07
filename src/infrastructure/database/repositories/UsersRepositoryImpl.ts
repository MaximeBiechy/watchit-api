import { UsersRepositoryInterface } from '../../../domain/repositories/index.js';
import { UserModel } from '../models/index.js';
import { injectable } from 'inversify';
import { User } from '../../../domain/entities/index.js';
import { Promise } from 'mongoose';
import { NotFoundError, ValidationError } from '../../../shared/errors/index.js';

@injectable()
class UsersRepositoryImpl implements UsersRepositoryInterface {
  async getAllUsers(): Promise<User[]> {
    const usersDocs = await UserModel.find().select('-password').lean();
    return usersDocs.map((userDoc) => {
      return new User(userDoc.id, userDoc.username, userDoc.email, userDoc.createdAt, userDoc.updatedAt);
    });
  }

  async getUserSettings(userId: string): Promise<User['settings']> {
    const user = await UserModel.findById(userId).select('settings').lean();
    if (!user) {
      throw new NotFoundError('User not found', 'UserNotFound');
    }

    return user.settings;
  };

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

  async markAsSeen(userId: string, mediaId: string, type: 'movie' | 'tv', rating?: number): Promise<void> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', 'UserNotFound');
    }

    const isInSeenMedia = user.seenMedia.some((item) => item.mediaId === mediaId && item.type === type);

    if (isInSeenMedia) {
      throw new ValidationError('Media already in seen list', 'MediaAlreadyInSeenList');
    }

    const watchedAt = new Date();

    user.seenMedia.push({ mediaId, type, rating, watchedAt });
    await user.save();
  }

  async removeSeenMedia(userId: string, mediaId: string, type: 'movie' | 'tv'): Promise<void> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', 'UserNotFound');
    }

    const initialLength = user.seenMedia.length;
    user.seenMedia = user.seenMedia.filter((item) => !(item.mediaId === mediaId && item.type === type));

    if (user.seenMedia.length === initialLength) {
      throw new NotFoundError('Media not found in seen list', 'MediaNotInSeenList');
    }

    await user.save();
  }

  async rateMedia(userId: string, mediaId: string, type: 'movie' | 'tv', rating: number): Promise<void> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', 'UserNotFound');
    }

    const watchedMedia = user.seenMedia.find((item) => item.mediaId === mediaId && item.type === type);

    if (watchedMedia && watchedMedia.rating === null) {
      watchedMedia.rating = rating;
    } else if (!watchedMedia) {
      const watchedAt = new Date();
      user.seenMedia.push({ mediaId, type, watchedAt, rating });
    } else {
      throw new ValidationError('Media already rated', 'MediaAlreadyRated');
    }

    await user.save();
  }

  async updateRatingMedia(userId: string, mediaId: string, type: 'movie' | 'tv', rating: number): Promise<void> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', 'UserNotFound');
    }

    const watchedMedia = user.seenMedia.find((item) => item.mediaId === mediaId && item.type === type);
    if (!watchedMedia) {
      throw new NotFoundError('Media not found in seen list', 'MediaNotInSeenList');
    }

    if (watchedMedia.rating !== rating) {
      watchedMedia.rating = rating;
      await user.save();
    }
  }

  async removeRatingMedia(userId: string, mediaId: string, type: 'movie' | 'tv'): Promise<void> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found', 'UserNotFound');
    }

    const watchedMedia = user.seenMedia.find((item) => item.mediaId === mediaId && item.type === type);
    if (!watchedMedia) {
      throw new NotFoundError('Media not found in seen list', 'MediaNotInSeenList');
    } else if (watchedMedia.rating === null) {
      throw new ValidationError('Media not rated', 'MediaNotRated');
    }

    watchedMedia.rating = null;
    await user.save();
  }
}

export default UsersRepositoryImpl;
