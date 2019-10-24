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
  formControl: {
    width: '100%',
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
}));
