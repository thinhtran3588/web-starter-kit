import { LoginType } from './login_type';

export interface AuthUser {
  id: string;
  displayName?: string;
  avatarUrl?: string;
  email?: string;
  emailVerified?: boolean;
  loginType: LoginType;
}
