import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  coverImage: {
    height: '500px',
    margin: -theme.spacing(2),
    backgroundImage: 'url(/static/images/cover.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  title: {
    margin: 0,
    paddingTop: 60,
    fontSize: 36,
  },
  paragraph: {
    margin: 0,
    paddingTop: 36,
    fontSize: 14,
  },
  introButtonContainer: {
    paddingTop: 36,
  },
}));
