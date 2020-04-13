import { AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'cookies-js';

import { AUTH_TOKEN_KEY } from 'environment';

export interface ErrorModel {
  message: string;
  status: number;
}

export const resolveError = (error?: AxiosError<string>): ErrorModel => {
  if (error) {
    const { response, message } = error;
    let errorMessage = '';

    if (response) {
      if (response.status === 404) {
        errorMessage = response.data || 'Service not found';
      }

      return {
        message: errorMessage || response.data || message || 'Unknown error (FE)',
        status: response.status,
      };
    }

    return {
      message: message || 'Unknown error (FE)',
      status: 500,
    };
  }

  return {
    message: 'Unknown error (FE)',
    status: 0,
  };
};

export const getHeaders = (): AxiosRequestConfig => ({
  headers: {
    [AUTH_TOKEN_KEY]: Cookies.get(AUTH_TOKEN_KEY),
  },
});
