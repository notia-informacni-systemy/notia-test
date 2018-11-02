import { randomBytes } from 'crypto';

export module Constants {
  export const ENV_DEV = 'development';
  export const ENV_PROD = 'production';
  export const NODE_PORT = process.env.NODE_PORT || 9002;
  export const NODE_ENV = process.env.NODE_ENV || ENV_DEV;
  export const SESSION_KEY = randomBytes(32).toString('hex');
  export const COOKIES_KEY = randomBytes(16).toString('hex');

}
