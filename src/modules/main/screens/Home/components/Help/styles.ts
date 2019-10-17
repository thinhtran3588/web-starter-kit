import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  helpContainer: {
    marginTop: 84,
  },
  helpIconContainer: {
    textAlign: 'center',
  },
  helpIcon: {
    width: 64,
    height: 64,
  },
  helpTitle: {
    margin: 0,
    textAlign: 'center',
    fontSize: 24,
  },
  helpInfo: {
    margin: '24px auto',
    maxWidth: 600,
    textAlign: 'center',
  },
  helpContact: {
    margin: '24px auto',
    textAlign: 'center',
    fontSize: 22,
    color: '#556cd6',
  },
}));
