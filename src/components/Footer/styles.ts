import makeStyles from '@material-ui/core/styles/makeStyles';
import grey from '@material-ui/core/colors/grey';

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: grey[900],
    padding: theme.spacing(2),
    color: `${theme.palette.background.default}`,
  },
  link: {
    '&:any-link': {
      color: `${theme.palette.background.default}`,
      textDecoration: 'none',
    },
  },
  linkContainer: {
    marginTop: theme.spacing(2),
  },
  socialLink: {
    marginRight: theme.spacing(1),
  },
  image: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));
