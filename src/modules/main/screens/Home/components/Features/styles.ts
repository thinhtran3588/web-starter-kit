import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  featuresContainer: {
    marginTop: 84,
  },
  featuresTitle: {
    textAlign: 'center',
    fontSize: 36,
  },
  featuresContent: {
    paddingTop: 24,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));
