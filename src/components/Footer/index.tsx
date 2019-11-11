import React from 'react';
import { withTranslation } from '@app/core';
import { WithTranslation } from 'react-i18next';
import { config } from '@app/config';
import clsx from 'clsx';
import { useStyles } from './styles';
import { Grid } from '../Grid';
import { Link } from '../Link';
import { Typography } from '../Typography';

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
              <Typography variant='h6'>{t('company')}</Typography>
              <div className={classes.linkContainer}>
                <Link href='/' className={classes.link}>
                  {t('home')}
                </Link>
              </div>
              <div className={classes.linkContainer}>
                <Link href='/aboutUs' className={classes.link}>
                  {t('aboutUs')}
                </Link>
              </div>
              <div className={classes.linkContainer}>
                <Link href='/blogs' className={classes.link}>
                  {t('blogs')}
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h6'>{t('socialMedias')}</Typography>
              <div>
                <Link href='/' className={classes.socialLink} title='facebook'>
                  <img
                    data-src={`${config.storageLocation.static}/images/facebook.png`}
                    className={clsx(classes.image, 'lazyload')}
                    alt='facebook'
                  />
                </Link>
                <Link href='/' className={classes.socialLink} title='linkedIn'>
                  <img
                    data-src={`${config.storageLocation.static}/images/linkedin.png`}
                    className={clsx(classes.image, 'lazyload')}
                    alt='linkedIn'
                  />
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant='h6'>
                &copy;{' '}
                <Link href='/' className={classes.link}>
                  {config.author}
                </Link>
                &nbsp;{config.copyRightYear}
              </Typography>
              <Typography variant='caption'>{t('createdWithLove')}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} lg={2}></Grid>
      </Grid>
    </footer>
  );
};

export const Footer = withTranslation('common')(BaseFooter);
