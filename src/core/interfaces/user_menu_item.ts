export interface UserMenuItem {
  id: string;
  name: string;
  url?: string;
  icon?: string;
  children?: UserMenuItem[];
}
