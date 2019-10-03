import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 56,
    height: 'calc(100% - 56px)',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
}));
