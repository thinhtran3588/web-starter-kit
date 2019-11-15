import React from 'react';
import { Snackbar as MuiSnackbar, SnackbarContent } from '@material-ui/core';
import clsx from 'clsx';
import { GET_CURRENT_NOTIFICATION_QUERY, NotificationContent, showNotification } from '@app/core';
import { useQuery } from '@apollo/react-hooks';
import { useStyles } from './styles';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';

interface SnackbarContentWrapperProps {
  className?: string;
  message?: string;
  onClose?: () => void;
  type?: NotificationContent['type'];
}

const SnackbarContentWrapper = (props: SnackbarContentWrapperProps): JSX.Element => {
  const classes = useStyles();
  const { className, message, onClose, type = 'INFO', ...other } = props;
  let iconName = 'Info';
  let typeClass = classes.info;
  if (type === 'SUCCESS') {
    iconName = 'CheckCircleIcon';
    typeClass = classes.success;
  } else if (type === 'WARNING') {
    iconName = 'Warning';
    typeClass = classes.warning;
  } else if (type === 'ERROR') {
    iconName = 'Error';
    typeClass = classes.error;
  }

  return (
    <SnackbarContent
      className={clsx(typeClass, className)}
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className={classes.message}>
          <Icon name={iconName} className={classes.icon} />
          {message}
        </span>
      }
      action={[
        <IconButton key='close' aria-label='close' color='inherit' onClick={onClose}>
          <Icon name='Close' className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
};

export const Notification = (): JSX.Element => {
  const { data } = useQuery(GET_CURRENT_NOTIFICATION_QUERY);
  const notification: NotificationContent | undefined = data ? data.currentNotification : undefined;
  const handleClose = (): void => {
    showNotification({
      type: notification ? notification.type : undefined,
      open: false,
    });
  };
  return (
    <>
      {notification && notification.open && (
        <MuiSnackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={!!notification && !!notification.open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <SnackbarContentWrapper
            onClose={handleClose}
            type={notification ? notification.type : 'INFO'}
            message={notification ? notification.message : ''}
          />
        </MuiSnackbar>
      )}
    </>
  );
};
