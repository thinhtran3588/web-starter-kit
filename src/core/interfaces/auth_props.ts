import { AuthUser } from './auth_user';
import { PermissionTree } from './permission_tree';
import { UserMenuItem } from './user_menu_item';

export interface AuthProps {
  authUser: AuthUser;
  permissions: PermissionTree;
  validatePermissions: (aggregateName: string, action: string, field?: string) => boolean;
  userMenuItems: UserMenuItem[];
}
