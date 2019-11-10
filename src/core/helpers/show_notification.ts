import { writeDataModel } from '../graphql';

export const showNotification = ({
  type,
  message,
  open,
}: {
  type?: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';
  message?: string;
  open?: boolean;
}): void => {
  writeDataModel(
    {
      type: type || 'INFO',
      message: message || '',
      open: open !== false,
    },
    'currentNotification',
  );
};
