import { User } from '../entities/index.js';

interface UsersRepositoryInterface {
  getAllUsers(): Promise<User[]>;

  findByEmail(email: string): Promise<User | null>;

  getUserById(userId: string): Promise<User | null>;

  getUserSettings(userId: string): Promise<User['settings']>;

  updateUserProfile(userId: string, data: any): Promise<void>;

  updateUserAvatar(userId: string, avatar: number): Promise<void>;

  updateUserSettings(userId: string, settings: User['settings']): Promise<void>;

  getUserWatchlist(userId: string): Promise<User['watchlist']>;

  addToWatchList(userId: string, mediaId: number, type: 'movie' | 'tv'): Promise<void>;

  removeFromWatchList(userId: string, mediaId: number, type: 'movie' | 'tv'): Promise<void>;

  getUserSeenMedia(userId: string): Promise<User['seenMedia']>;

  markAsSeen(userId: string, mediaId: number, type: 'movie' | 'tv'): Promise<void>;

  removeSeenMedia(userId: string, mediaId: number, type: 'movie' | 'tv'): Promise<void>;

  rateMedia(userId: string, mediaId: number, type: 'movie' | 'tv', rating: number): Promise<void>;

  updateRatingMedia(userId: string, mediaId: number, type: 'movie' | 'tv', rating: number): Promise<void>;

  removeRatingMedia(userId: string, mediaId: number, type: 'movie' | 'tv'): Promise<void>;
}

export default UsersRepositoryInterface;
