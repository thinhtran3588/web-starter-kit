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
}));
