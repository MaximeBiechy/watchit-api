import { model, Schema, Document } from 'mongoose';

interface MediaItem {
  mediaId: number;
  type: 'movie' | 'tv';
}

interface SeenMedia extends MediaItem {
  rating?: number;
  watchedAt?: Date;
}

interface Settings {
  language: string;
}

interface UserDocument extends Document {
  username: string;
  email: string;
  passwordHash?: string;
  avatar?: number;
  watchlist: MediaItem[];
  seenMedia: SeenMedia[];
  settings: Settings;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, default: null }, // ! Password can be null when user registers with OAuth (Google, Facebook, Apple)
    avatar: { type: Number, default: null },
    watchlist: {
      type: [
        {
          mediaId: { type: Number, required: true },
          type: { type: String, enum: ['movie', 'tv'], required: true },
        },
      ],
      default: [],
    },
    seenMedia: {
      type: [
        {
          mediaId: { type: Number, required: true },
          type: { type: String, enum: ['movie', 'tv'], required: true },
          rating: { type: Number, min: 1, max: 10, default: null },
          watchedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    settings: {
      language: { type: String, required: true, enum: ['en', 'fr'], default: 'en' },
    },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

export const UserModel = model<UserDocument>('User', UserSchema);
