import PasswordResetToken from '~/server/models/PasswordResetToken';

export const getPasswordResetTokenByToken = (token: string) => {
  try {
    return PasswordResetToken.findOne({ token });
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = (email: string) => {
  try {
    return PasswordResetToken.findOne({ email });
  } catch {
    return null;
  }
};
