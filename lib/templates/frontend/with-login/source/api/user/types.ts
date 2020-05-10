import { UserResponse } from 'store/user/types';

export interface UserAPI {
  authenticate(): Promise<UserResponse>;
  register(name: string, email: string, password: string): Promise<UserResponse>;
  login(email: string, password: string): Promise<UserResponse>;
}
