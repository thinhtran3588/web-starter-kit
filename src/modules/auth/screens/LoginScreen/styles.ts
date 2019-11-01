import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginTop: theme.spacing(3),
  },
  bottomLinkContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  bottomLink: {
    marginTop: theme.spacing(4),
  },
  facebook: {
    backgroundColor: '#4267b2',
  },
  google: {
    backgroundColor: '#d93025',
  },
  languageSelection: {
    marginTop: theme.spacing(3),
  },
  linkButton: {
    width: '100%',
  },
}));
