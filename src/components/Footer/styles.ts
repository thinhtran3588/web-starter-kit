import makeStyles from '@material-ui/core/styles/makeStyles';
import grey from '@material-ui/core/colors/grey';

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: grey[900],
    padding: theme.spacing(2),
    color: theme.palette.background.default,
  },
  company: {
    fontSize: theme.spacing(2.5),
  },
  socialLink: {
    marginRight: theme.spacing(1),
  },
  image: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  signature: {
    padding: `${theme.spacing(5)}px 0px ${theme.spacing(2)}px 0px`,
  },
}));
