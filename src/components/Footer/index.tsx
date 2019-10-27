import React from 'react';
import { withTranslation } from '@app/core';
import { WithTranslation } from 'react-i18next';
import { Typography, Grid, Link } from '@material-ui/core';
import { config } from '@app/config';
import { useStyles } from './styles';

type Props = WithTranslation;

export const BaseFooter = (props: Props): JSX.Element => {
  const { t } = props;
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Grid container>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <h3 className={classes.company}>Company</h3>
              <div>
                <Link color='inherit'>About us</Link>
              </div>
              <div>
                <Link color='inherit'>Contact</Link>
              </div>
              <div>
                <Link color='inherit'>Products</Link>
              </div>
              <div>
                <Link color='inherit'>Blogs</Link>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <h3 className={classes.company}>Legal</h3>
              <div>
                <Link color='inherit'>FAQ</Link>
              </div>
              <div>
                <Link color='inherit'>Premium support</Link>
              </div>
              <div>
                <Link color='inherit'>Sponsorships</Link>
              </div>
              <div>
                <Link color='inherit'>Custom development</Link>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <h3 className={classes.company}>Social medias</h3>
              <div>
                <Link color='inherit' className={classes.socialLink}>
                  <img src={`${config.storageLocation.static}/images/facebook.png`} className={classes.image} />
                </Link>
                <Link color='inherit' className={classes.socialLink}>
                  <img src={`${config.storageLocation.static}/images/dribbble.png`} className={classes.image} />
                </Link>
                <Link color='inherit' className={classes.socialLink}>
                  <img src={`${config.storageLocation.static}/images/google-plus.png`} className={classes.image} />
                </Link>
                <Link color='inherit' className={classes.socialLink}>
                  <img src={`${config.storageLocation.static}/images/linkedin.png`} className={classes.image} />
                </Link>
                <Link color='inherit' className={classes.socialLink}>
                  <img src={`${config.storageLocation.static}/images/pinterest.png`} className={classes.image} />
                </Link>
              </div>
            </Grid>
          </Grid>

          <div className={classes.signature}>
            <Typography variant='body1'>
              &copy; <Link href='/'>{config.author}</Link>
              &nbsp;{config.copyRightYear}
            </Typography>
            <Typography variant='caption'>{t('footer.createdWithLove')}</Typography>
          </div>
        </Grid>
        <Grid item xs={1} lg={2}></Grid>
      </Grid>
    </footer>
  );
};

export const Footer = withTranslation('common')(BaseFooter);
