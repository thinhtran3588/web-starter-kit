import React from 'react';
import { config } from '@app/config';
import { Button, Grid } from '@app/components';
import { useStyles } from './styles';

interface Props {
  t: (key: string) => string;
}

export const CoverImage = (props: Props): JSX.Element => {
  const { t } = props;
  const classes = useStyles();

  return (
    <div
      className={classes.coverImage}
      style={{
        backgroundImage: `url(${config.storageLocation.static}/images/cover.jpg)`,
      }}
    >
      <Grid container>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={4}>
          <h2 className={classes.title}>{t('coverTitle')}</h2>
          <p className={classes.paragraph}>{t('coverParagraph')}</p>
          <div className={classes.introButtonContainer}>
            <Button variant='contained' color='primary'>
              {t('explore')}
            </Button>
          </div>
        </Grid>
        <Grid item xs={1} lg={2}></Grid>
      </Grid>
    </div>
  );
};
