import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    uri: process.env.MONGO_CONNECTION_URI,
  }),
);

export interface DatabaseConfig {
  uri: string;
}
