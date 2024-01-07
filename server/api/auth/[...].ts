import CredentialsProvider from 'next-auth/providers/credentials';
import type { DefaultSession } from 'next-auth';
import type { Types } from 'mongoose';
import { NuxtAuthHandler } from '#auth';
import User from '~/server/models/User';
import { sendVerificationEmail } from '~/utils/mail';
import { generateVerificationToken } from '~/utils/token';

export type ExtendedUser = DefaultSession['user'] & {
  _id: Types.ObjectId;
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
          const verificationToken = await generateVerificationToken(existingUser.email);
          await sendVerificationEmail(verificationToken.email, verificationToken.token);
          throw createError({
            statusCode: 401,
            statusMessage: 'Email not verified. A new verification email has been sent to your email address.',
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...user } = existingUser.toObject();
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      if (!user) return token;
      token.user = user;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.user) {
        session.user = token.user as ExtendedUser;
      }
      return session;
    },
  },
});
