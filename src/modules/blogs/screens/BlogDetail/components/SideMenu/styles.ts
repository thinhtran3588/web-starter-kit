import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  categoriesContainer: {
    marginTop: theme.spacing(8),
  },
  card: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  categoriesTitle: {
    margin: theme.spacing(0),
    fontSize: theme.spacing(3),
    fontWeight: 'bold',
    color: '#fff',
  },
  categoriesDescription: {
    color: '#fff',
  },
  categoriesButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  card2: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  alsoWatch: {
    fontSize: theme.spacing(3),
  },
  relatedCard: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  media: {
    height: theme.spacing(15),
    marginRight: theme.spacing(1),
    width: theme.spacing(50),
  },
}));
