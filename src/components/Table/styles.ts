import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  tableWrapper: {
    flexGrow: 1,
    overflow: 'auto',
  },
  commandButton: {
    marginRight: theme.spacing(0.5),
  },
}));
