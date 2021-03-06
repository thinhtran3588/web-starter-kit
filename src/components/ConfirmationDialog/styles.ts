import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
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
    paddingTop: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
    padding: theme.spacing(2, 3),
  },
}));
