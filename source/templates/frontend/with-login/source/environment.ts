export const environment = process.env.NODE_ENV;

export const isDevelopment = environment === 'development';
export const isProduction = environment === 'production';
export const isStaging = environment === 'staging';

export const API_PREFIX = '/api';
export const STORAGE_PREFIX = 'demos-';

export const AUTH_TOKEN_KEY = `${STORAGE_PREFIX}authorization`;
export const LAST_URL_KEY = `${STORAGE_PREFIX}last-url`;
