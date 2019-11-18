import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  separator: {
    flexGrow: 1,
  },
  commands: {},
  button: {
    marginLeft: theme.spacing(1),
  },
}));
