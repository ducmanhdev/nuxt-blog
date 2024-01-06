import { model, Schema } from 'mongoose';

export interface IPasswordResetToken {
  email: string;
  token: string;
  expires: Date;
}

const PasswordResetTokenSchema = new Schema({
  email: String,
  token: String,
  expires: Date,
});

const PasswordResetToken = model<IPasswordResetToken>('PasswordResetToken', PasswordResetTokenSchema);
export default PasswordResetToken;
