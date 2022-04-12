import { registerAs } from '@nestjs/config';

export default registerAs(
  'email',
  (): EmailConfig => ({
    user: process.env.SENDER_EMAIL,
    password: process.env.SENDER_EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    dispatch: process.env.EMAIL_DISPATCH,
  }),
);

export interface EmailConfig {
  user: string;
  password: string;
  host: string;
  dispatch: string;
}
