import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
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
        });
        if (!user) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials',
          });
        }
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials',
          });
        }

        const { email, _id } = user.toObject();
        return {
          email,
          _id,
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
