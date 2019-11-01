import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  featuresContainer: {
    marginTop: theme.spacing(10),
  },
  featuresTitle: {
    textAlign: 'center',
    fontSize: theme.spacing(5),
  },
  featuresContent: {
    paddingTop: theme.spacing(3),
  },
  media: {
    height: theme.spacing(0),
    paddingTop: '56.25%', // 16:9
  },
}));
