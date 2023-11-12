import { Schema, model } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
  birthday: string;
  phone: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    length: [8, 'Password must be at least 8 characters long'],
  },
  name: {
    type: String,
    trim: true,
  },
  birthday: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    unique: true,
    trim: true,
  },
});

export const User = model<UserDocument>('User', UserSchema);
