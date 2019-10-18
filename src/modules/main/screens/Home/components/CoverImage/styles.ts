import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  coverImage: {
    height: theme.spacing(60),
    margin: -theme.spacing(2),
    backgroundImage: 'url(/static/images/cover.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  title: {
    margin: theme.spacing(0),
    paddingTop: theme.spacing(8),
    fontSize: theme.spacing(4),
  },
  paragraph: {
    margin: theme.spacing(0),
    paddingTop: theme.spacing(4),
    fontSize: theme.spacing(2),
  },
  introButtonContainer: {
    paddingTop: theme.spacing(5),
  },
}));
