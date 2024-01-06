import { v4 as uuidv4 } from 'uuid';
import { getVerificationTokenByEmail } from '~/server/db/verification-token';
import { getPasswordResetTokenByEmail } from '~/server/db/password-reset-token';
import PasswordResetToken from '~/server/models/PasswordResetToken';
import VerificationToken from '~/server/models/VerificationToken';

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await PasswordResetToken.findByIdAndDelete(existingToken.id);
  }

  return PasswordResetToken.create({
    email,
    token,
    expires,
  });
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    VerificationToken.findByIdAndDelete(existingToken.id);
  }

  return VerificationToken.create({
    email,
    token,
    expires,
  });
};
