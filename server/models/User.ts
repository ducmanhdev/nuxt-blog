import { Schema, model } from 'mongoose';
import { REQUIRED_PASSWORD_LENGTH } from '~/constants';

export interface IUser {
  avatar: string;
  email: string;
  password: string;
  name: string;
  birthday: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
}

const UserSchema = new Schema({
  avatar: {
    type: String,
  },
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
    length: [REQUIRED_PASSWORD_LENGTH, `Password must be at least ${REQUIRED_PASSWORD_LENGTH} characters long`],
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
