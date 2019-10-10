export interface NavItem {
  id: string;
  link?: string;
  text: string;
  icon?: string;
  requestPermission?: string;
  children?: NavItem[];
  color?: string;
  bgColor?: string;
  expanded?: true;
}
