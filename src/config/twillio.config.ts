import { registerAs } from '@nestjs/config';

export default registerAs('twillio', (): TwillioConfig => ({
    accountSid: process.env.TWILLO_ACCOUNT_SID,
    authToken: process.env.TWILLO_AUTH_TOKEN,
    apiKey: process.env.TWILLO_API_KEY,
	chatServiceId:process.env.TWILLO_CHAT_SERVICE_ID,
	apiSecret:process.env.TWILLO_API_SECRET
}));

export interface TwillioConfig {
    accountSid: string;
    authToken: string;
    apiKey: string;
    chatServiceId: string;
    apiSecret: string;
}
