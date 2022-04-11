import { registerAs } from '@nestjs/config';

export default registerAs('email', (): EmailConfig => ({
    user: process.env.SENDER_EMAIL,
    password: process.env.SENDER_EMAIL_PASSWORD,
	host: process.env.EMAIL_HOST
}));

export interface EmailConfig {
    user: string;
    password: string;
	host:string;
}
