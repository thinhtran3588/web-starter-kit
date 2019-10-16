import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  quoteContainer: {
    marginTop: 84,
  },
  quote: {
    width: '70%',
    margin: '0 auto',
    textAlign: 'center',
    fontSize: 24,
  },
  signatureContainer: {
    marginTop: 24,
    textAlign: 'center',
  },
  signatureName: {
    color: '#556cd6',
    fontSize: 18,
  },
  signatureJob: {
    fontSize: 18,
  },
  coverImage2: {
    marginTop: 72,
    height: '500px',
    margin: -theme.spacing(2),
    backgroundImage: 'url(/static/images/cover2.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
}));
