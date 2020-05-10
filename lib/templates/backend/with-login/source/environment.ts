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
export const JWT_SECRET = '46353svba5734Adbde9sz-as65D5f436asv384120';
export const AUTH_TOKEN_KEY = '{{projectName}}-authorization';

export const AUTH_COOKIE_OPTIONS = {
  maxAge: 1000 * 60 * 60 * 24,
};
