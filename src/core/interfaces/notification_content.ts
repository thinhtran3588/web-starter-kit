export interface NotificationContent {
  type?: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';
  message?: string;
  open?: boolean;
}
