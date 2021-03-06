import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  categoriesContainer: {
    marginTop: theme.spacing(8),
  },
  card: {
    padding: theme.spacing(3),
    height: theme.spacing(25),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: 'url(/static/images/intro1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  categoriesTitle: {
    margin: theme.spacing(0),
    fontSize: theme.spacing(3),
    fontWeight: 'bold',
    color: theme.palette.background.default,
  },
  categoriesDescription: {
    color: theme.palette.background.default,
  },
  categoriesButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  card2: {
    padding: theme.spacing(3),
    height: theme.spacing(25),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: 'url(/static/images/intro2.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  card3: {
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: 'url(/static/images/intro3.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  card4: {
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: 'url(/static/images/intro4.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
}));
