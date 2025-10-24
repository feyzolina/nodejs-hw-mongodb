import nodemailer from 'nodemailer';
import { env } from '../utils/env.js';

const transporter = nodemailer.createTransporter({
  host: env('SMTP_HOST'),
  port: Number(env('SMTP_PORT')),
  secure: false, // STARTTLS
  auth: {
    user: env('SMTP_USER'),
    pass: env('SMTP_PASSWORD'),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail({
    from: env('SMTP_FROM'),
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};