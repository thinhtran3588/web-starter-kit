import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    marginTop: 56,
    height: 'calc(100% - 56px)',
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  list: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightBold,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));
