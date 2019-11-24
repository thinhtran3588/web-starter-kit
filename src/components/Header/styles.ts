import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
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
    marginLeft: theme.spacing(2),
  },
  menuItemButton: {
    padding: theme.spacing(2.5),
  },
  displayName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#fff',
    textTransform: 'none',
    margin: theme.spacing(2, 0),
  },
}));
