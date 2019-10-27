import makeStyles from '@material-ui/core/styles/makeStyles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

export const useStyles = makeStyles((theme) => ({
  coverImage: {
    height: theme.spacing(70),
    backgroundImage: 'url(/static/images/cover.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  breadCrum: {
    padding: `${theme.spacing(1)}px 0`,
  },
  title: {
    fontSize: theme.spacing(3),
    padding: `${theme.spacing(1)}px 0`,
  },
  author: {
    display: 'flex',
    alignItems: 'center',
  },
  authorAvatar: {
    marginRight: theme.spacing(1),
  },
  purpleAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    fontSize: theme.spacing(4),
    backgroundColor: deepOrange[500],
  },
  authorName: {
    color: deepPurple[500],
    fontWeight: 'bold',
    fontSize: theme.spacing(2),
  },
  image1: {
    width: '100%',
    height: 'auto',
  },
  media: {
    height: theme.spacing(20),
  },
  relatedTopic: {
    fontSize: theme.spacing(2.5),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));
