import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  categoriesContainer: {
    marginTop: 60,
  },
  card: {
    padding: 24,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: 'url(/static/images/intro1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  categoriesTitle: {
    margin: 0,
    fontSize: 24,
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
    padding: 24,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: 'url(/static/images/intro2.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  card3: {
    padding: 24,
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
    padding: 24,
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
