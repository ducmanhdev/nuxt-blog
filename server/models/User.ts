import crypto from 'crypto';
import { Model, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { REQUIRED_PASSWORD_LENGTH } from '~/constants';

export interface IUser {
  avatar: string;
  email: string;
  isVerified: boolean;
  password: string;
  passwordConfirm: string | undefined;
  passwordChangedAt: Date;
  passwordResetToken: String | undefined;
  passwordResetExpires: Date | undefined;
  name: string;
  birthday: Date;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  isActive: boolean;
}

interface IUserMethods {
  checkPassword(candidatePassword: string): Promise<boolean>;

  createPasswordResetToken(): string;

  clearPasswordResetToken(): void;

  changedPasswordAfter(JWTTimestamp: number): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v: any) => z.string().email().parse(v),
      message: (props: any) => `${props.value} is not a valid email!`,
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    trim: true,
    minlength: [REQUIRED_PASSWORD_LENGTH, `Password must be at least ${REQUIRED_PASSWORD_LENGTH} characters long`],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (v: any): boolean {
        return v === (this as any).password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  name: {
    type: String,
    trim: true,
  },
  birthday: {
    type: Date,
    trim: true,
  },
  phone: {
    type: String,
    // unique: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;
  next();
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

UserSchema.pre(/^find/, function (next) {
  (this as any).find({ isActive: { $ne: false } });
  next();
});

UserSchema.methods.checkPassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(String(this.passwordChangedAt.getTime() / 1000), 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};

UserSchema.methods.clearPasswordResetToken = function () {
  this.passwordResetToken = undefined;
  this.passwordResetExpires = undefined;
};

const User = model<IUser, UserModel>('User', UserSchema);
export default User;
