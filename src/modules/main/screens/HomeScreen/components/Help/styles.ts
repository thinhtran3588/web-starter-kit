import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  helpContainer: {
    marginTop: theme.spacing(10),
  },
  helpIconContainer: {
    textAlign: 'center',
  },
  helpIcon: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  helpTitle: {
    margin: theme.spacing(0),
    textAlign: 'center',
    fontSize: theme.spacing(3),
  },
  helpInfo: {
    margin: `${theme.spacing(3)}px auto`,
    maxWidth: theme.spacing(80),
    textAlign: 'center',
  },
  helpContact: {
    margin: `${theme.spacing(3)}px auto`,
    textAlign: 'center',
    fontSize: theme.spacing(3),
    color: '#556cd6',
  },
}));
