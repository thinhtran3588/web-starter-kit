import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  root: {
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
  },
  menuItemIcon: {},
  menuItemText: {
    marginLeft: 10,
  },
  menuItemButton: {
    padding: 20,
  },
}));
