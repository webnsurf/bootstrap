import { API } from 'api';
import { UserResponse } from 'store/user/types';

import { UserAPI } from './types';

const USER_API_PREFIX = 'users/';

export const userAPI: UserAPI = {
  authenticate: async () => {
    const response = await API.get<UserResponse>(`${USER_API_PREFIX}authenticate`);
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await API.post<UserResponse>(`${USER_API_PREFIX}register`, { name, email, password });
    return response.data;
  },

  login: async (email, password) => {
    const response = await API.post<UserResponse>(`${USER_API_PREFIX}login`, { email, password });
    return response.data;
  },
};
