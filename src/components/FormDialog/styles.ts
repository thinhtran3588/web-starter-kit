import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    height: '100%',
    margin: 0,
    maxWidth: '100%',
    maxHeight: 'none',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  mobileButton: {
    marginTop: theme.spacing(2),
  },
  content: {
    paddingTop: 0,
  },
  appBar: {
    position: 'relative',
    padding: theme.spacing(2, 3),
  },
}));
