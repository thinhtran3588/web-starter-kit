import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  appBar: {
    boxShadow: 'none',
  },
  flexGrow: {
    flexGrow: 1,
  },
  logo: {
    height: 50,
  },
  menuItem: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2em',
    textDecoration: 'none',
    padding: '1.2em',
  },
}));
