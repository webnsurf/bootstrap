export const environment = process.env.BUILD_ENV;

export const isDevelopment = environment === 'development';
export const isLocal = environment === 'local';
export const isProduction = environment === 'production';
export const isStaging = environment === 'staging';

export const API_PREFIX = '/api';
export const STORAGE_PREFIX = '{{projectName}}-';

export const AUTH_TOKEN_KEY = `${STORAGE_PREFIX}authorization`;
export const LAST_URL_KEY = `${STORAGE_PREFIX}last-url`;
