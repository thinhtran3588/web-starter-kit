import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  blogsListContainer: {
    marginTop: 60,
    marginBottom: 60,
  },
  blogItemContainer: {
    height: '100%',
    margin: '12px 0',
  },
  grid: {
    marginTop: 24,
    width: '100%',
    height: '100%',
  },
  blogImage: {
    borderRadius: 10,
    width: '100%',
    height: 300,
    backgroundImage: 'url(/static/images/intro1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  bloginContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0 16px 16px 16px',
  },
  blogTitle: {
    margin: 0,
    fontSize: 20,
    lineHeight: '1.5em',
    height: '3em',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  blogDescription: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#556cd6',
  },
  blogItemFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
