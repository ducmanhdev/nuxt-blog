import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.BASE_URL || 'http://localhost:3000';

const from = 'onboarding@resend.dev';

export const sendTwoFactorTokenEmail = (email: string, token: string) => {
  return resend.emails.send({
    from,
    to: email,
    subject: '2FA Code',
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = (email: string, token: string) => {
  const resetLink = `${domain}/reset-password?token=${token}`;

  return resend.emails.send({
    from,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = (email: string, token: string) => {
  const confirmLink = `${domain}/verify?token=${token}`;

  return resend.emails.send({
    from,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
