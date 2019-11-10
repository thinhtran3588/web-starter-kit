import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';

export const useStyles = makeStyles((theme: Theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));
