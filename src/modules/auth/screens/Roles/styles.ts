import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(1),
    '&:hover': {
      color: 'blue',
    },
  },
}));
