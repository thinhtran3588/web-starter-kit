import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    minWidth: theme.spacing(40),
    minHeight: '100vh',
    height: '100vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    backgroundSize: 'cover',
  },
  form: {
    width: theme.spacing(62.5),
    minWidth: theme.spacing(40),
    height: '100%',
    overflowY: 'auto',
    zIndex: 10,
    flexDirection: 'column',
    padding: `${theme.spacing(10)}px ${theme.spacing(6)}px`,
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: '100%',
    display: 'flex',
    marginBottom: theme.spacing(6),
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  logoText: {
    textAlign: 'center',
  },
  links: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot: {
    marginBottom: theme.spacing(1.5),
  },
}));
