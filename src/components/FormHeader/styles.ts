import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  mobileTitle: {
    width: '100%',
    textAlign: 'center',
  },
  separator: {
    flexGrow: 1,
  },
  mobileButtonContainer: {
    width: '100%',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  mobileButton: {
    marginTop: theme.spacing(2),
  },
}));
