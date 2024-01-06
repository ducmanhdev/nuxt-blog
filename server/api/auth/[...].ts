import CredentialsProvider from 'next-auth/providers/credentials';
import type { DefaultSession } from 'next-auth';
import { NuxtAuthHandler } from '#auth';
import User from '~/server/models/User';

export type ExtendedUser = DefaultSession['user'] & {
  id: string;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: '/login',
  },
  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {},
      async authorize(credentials: { email: string; password: string }) {
        const { email, password } = credentials;
        const existingUser = await User.findOne({ email }).select('+password');
        const isPasswordCorrect = await existingUser?.checkPassword(password);

        if (!existingUser || !isPasswordCorrect) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials',
          });
        }

        if (!existingUser.emailVerified) {
          throw createError({
            statusCode: 403,
            statusMessage: 'Email is not verified, please confirm your email!',
          });
        }

        return existingUser;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      if (!user) return token;
      token.name = user.name;
      token.email = user.email;
      token.image = user.image;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string | null;
      }
      return session;
    },
  },
});
