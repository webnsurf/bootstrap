export const environment = process.env.BUILD_ENV;

export const isDevelopment = environment === 'development';
export const isLocal = environment === 'local';
export const isStaging = environment === 'staging';
export const isProduction = environment === 'production';
