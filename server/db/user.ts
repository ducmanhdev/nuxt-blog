import User from '~/server/models/User';

export const getUserByEmail = (email: string) => {
  try {
    return User.findOne({ email });
  } catch {
    return null;
  }
};

export const getUserById = (id: string) => {
  try {
    return User.findById(id);
  } catch {
    return null;
  }
};
