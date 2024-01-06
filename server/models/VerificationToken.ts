import { model, Schema } from 'mongoose';

export interface IVerificationToken {
  email: string;
  token: string;
  expires: Date;
}

const VerificationTokenSchema = new Schema({
  email: String,
  token: String,
  expires: Date,
});

const VerificationToken = model<IVerificationToken>('VerificationToken', VerificationTokenSchema);
export default VerificationToken;
