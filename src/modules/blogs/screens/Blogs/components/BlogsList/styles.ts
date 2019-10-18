import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  blogsListContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  blogItemContainer: {
    height: '100%',
    margin: `${theme.spacing(1)}px 0`,
  },
  grid: {
    marginTop: theme.spacing(3),
    width: '100%',
    height: '100%',
  },
  blogImage: {
    borderRadius: 10,
    width: '100%',
    height: theme.spacing(38),
    backgroundImage: 'url(/static/images/intro1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  bloginContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
  },
  blogTitle: {
    margin: theme.spacing(0),
    fontSize: theme.spacing(3),
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
