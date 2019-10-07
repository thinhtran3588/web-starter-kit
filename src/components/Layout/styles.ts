import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 56,
    height: 'calc(100vh - 56px)',
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      height: 'calc(100vh - 64px)',
    },
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flexGrow: 1,
  },
}));
