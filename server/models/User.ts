import { Schema, model } from 'mongoose';

export interface IUser {
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
  gender: {
    type: 'String',
    enum: ['Male', 'Female', 'Other'],
  },
});

const User = model<IUser>('User', UserSchema);
export default User;
