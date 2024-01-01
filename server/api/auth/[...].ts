import CredentialsProvider from 'next-auth/providers/credentials';
import { NuxtAuthHandler } from '#auth';
import User from '~/server/models/User';

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: '/login',
  },
  providers: [
    // @ts-ignore
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: { email: string; password: string }) {
        const user = await User.findOne({
          email: credentials.email,
        }).select('password');
        const isPasswordCorrect = await user?.checkPassword(credentials.password);
        if (!user || !isPasswordCorrect) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials',
          });
        }
        return {
          _id: user._id,
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }
      return token;
    },

    session({ session, token }) {
      session.user = {
        ...session.user,
        ...token,
      };
      return session;
    },
  },
});
