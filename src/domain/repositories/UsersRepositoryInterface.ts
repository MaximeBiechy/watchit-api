import { User } from '../entities/index.js';

interface UsersRepositoryInterface {
  getAllUsers(): Promise<User[]>;

  getUserSettings(userId: string): Promise<User['settings']>;

  addToWatchList(userId: string, mediaId: string, type: 'movie' | 'tv'): Promise<void>;

  removeFromWatchList(userId: string, mediaId: string, type: 'movie' | 'tv'): Promise<void>;

  markAsSeen(userId: string, mediaId: string, type: 'movie' | 'tv'): Promise<void>;

  removeSeenMedia(userId: string, mediaId: string, type: 'movie' | 'tv'): Promise<void>;

  rateMedia(userId: string, mediaId: string, type: 'movie' | 'tv', rating: number): Promise<void>;

  updateRatingMedia(userId: string, mediaId: string, type: 'movie' | 'tv', rating: number): Promise<void>;

  removeRatingMedia(userId: string, mediaId: string, type: 'movie' | 'tv'): Promise<void>;
}

export default UsersRepositoryInterface;
