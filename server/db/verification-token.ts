import VerificationToken from '~/server/models/VerificationToken';

export const getVerificationTokenByToken = (token: string) => {
  try {
    return VerificationToken.findOne({ token });
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = (email: string) => {
  try {
    return VerificationToken.findOne({ email });
  } catch {
    return null;
  }
};
