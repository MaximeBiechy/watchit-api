import { model, Schema, Document } from 'mongoose';

interface MediaItem {
  mediaId: string;
  type: 'movie' | 'tv';
}

interface SeenMedia extends MediaItem {
  rating?: number;
}

interface UserDocument extends Document {
  username: string;
  email: string;
  passwordHash?: string;
  watchlist: MediaItem[];
  seenMedia: SeenMedia[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, default: null }, // ! Password can be null when user registers with OAuth (Google, Facebook, Apple)
    watchlist: {
      type: [
        {
          mediaId: { type: String, required: true },
          type: { type: String, enum: ['movie', 'tv'], required: true },
        },
      ],
      default: [],
    },
    seenMedia: {
      type: [
        {
          mediaId: { type: String, required: true },
          type: { type: String, enum: ['movie', 'tv'], required: true },
          rating: Number,
        },
      ],
      default: [],
    },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

export const UserModel = model<UserDocument>('User', UserSchema);
