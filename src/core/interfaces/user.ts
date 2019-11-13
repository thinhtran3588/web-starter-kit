import { LoginType } from './login_type';

export interface User {
  id: string;
  displayName?: string;
  avatarUrl?: string;
  email?: string;
  emailVerified?: boolean;
  loginType: LoginType;
}
