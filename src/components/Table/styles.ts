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
    marginRight: theme.spacing(1.5),
  },
  commandCell: {
    padding: theme.spacing(1.5, 1),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));
