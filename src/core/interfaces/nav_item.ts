export interface NavItem {
  id: string;
  url?: string;
  name: string;
  icon?: string;
  children?: NavItem[];
  color?: string;
  bgColor?: string;
  expanded?: boolean;
}
