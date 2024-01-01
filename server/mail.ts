import nodemailer from 'nodemailer';
import { IUser } from '~/server/models/User';

export default class Email {
  to: string;
  url: string | undefined;
  from: string;

  constructor(user: IUser, url?: string) {
    this.to = user.email;
    this.url = url;
    this.from = `NuxtJS Blog <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    } as any);
  }

  async send(subject: string) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: this.url,
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('Welcome to the NuxtJS Blog!');
  }

  async sendPasswordReset() {
    await this.send('Your password reset token (valid for only 10 minutes)');
  }
}
