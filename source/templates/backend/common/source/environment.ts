const nodeEnv = process.env.NODE_ENV;

const isDevelopment = nodeEnv === 'development';
const isProduction = nodeEnv === 'production';
const isStaging = nodeEnv === 'staging';
const isLocal = nodeEnv === 'local';

export const env = {
  type: nodeEnv,
  isDevelopment,
  isProduction,
  isStaging,
  isLocal,
};

export const PORT = 3000;
