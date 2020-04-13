import axios from 'axios';

import { API_PREFIX } from 'environment';

import { getHeaders } from './utils';

export const API = {
  get<T>(url: string) {
    return axios.get<T>(`${API_PREFIX}/${url}`, getHeaders());
  },
  post<T>(url: string, data: { [key: string]: any }) {
    return axios.post<T>(`${API_PREFIX}/${url}`, data, getHeaders());
  },
};
