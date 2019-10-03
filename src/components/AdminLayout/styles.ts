import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 56,
    height: 'calc(100% - 56px)',
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 240,
    },
  },
}));
