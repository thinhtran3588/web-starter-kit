import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  coverImage: {
    height: '500px',
    margin: -theme.spacing(2),
    backgroundImage: 'url(/static/images/cover.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeate',
  },
  title: {
    margin: 0,
    paddingTop: 60,
    fontSize: 36,
  },
  paragraph: {
    margin: 0,
    paddingTop: 36,
    fontSize: 14,
  },
  introButtonContainer: {
    paddingTop: 36,
  },
  section2Container: {
    marginTop: 84,
  },
  section2Title: {
    textAlign: 'center',
    fontSize: 36,
  },
  section2Content: {
    paddingTop: 24,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  helpIconContainer: {
    textAlign: 'center',
  },
  helpIcon: {
    width: 64,
    height: 64,
  },
  helpTitle: {
    margin: 0,
    textAlign: 'center',
    fontSize: 24,
  },
  helpInfo: {
    margin: '24px auto',
    maxWidth: 600,
    textAlign: 'center',
  },
  helpContact: {
    margin: '24px auto',
    textAlign: 'center',
    fontSize: 22,
    color: '#556cd6',
  },
}));
