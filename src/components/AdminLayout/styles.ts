import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 56,
    height: 'calc(100vh - 56px)',
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      height: 'calc(100vh - 64px)',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 240,
    },
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flexGrow: 1,
  },
}));
