import { model, Schema, Document } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  email: string;
  passwordHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, default: null }, // ! Password can be null when user registers with OAuth (Google, Facebook, Apple)
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

export const UserModel = model<UserDocument>('User', UserSchema);
