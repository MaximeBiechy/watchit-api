import { ValidationError } from '../../shared/errors/index.js';


type MediaType = 'movie' | 'tv';

interface MediaItem {
  mediaId: number;
  type: MediaType;
}

interface SeenMedia extends MediaItem {
  rating?: number | null;
  watchedAt?: Date | null;
}

interface Settings {
  language: 'en' | 'fr';
}

class User {
  constructor(
    public readonly id: string,
    public username: string,
    public email: string,
    public avatar: number | undefined,
    public createdAt: Date,
    public updatedAt: Date,
    public passwordHash?: string,
    public watchlist: MediaItem[] = [],
    public seenMedia: SeenMedia[] = [],
    public settings: Settings = { language: 'en' },
  ) {}

  static create(username: string, email: string, passwordHash?: string): User {
    if (!username || username.length < 3 || username.length > 20) {
      throw new ValidationError('Username must have between 3 and 20 characters');
    }

    if (!passwordHash) {
      throw new ValidationError('Password hash is required');
    }

    const now = new Date();
    const id = crypto.randomUUID();

    return new User(id, username, email, 1, now, now, passwordHash);
  }
}

export default User;
