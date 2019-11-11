import React from 'react';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { config } from '@app/config';
import { useStyles } from './styles';

interface Props {
  t: (key: string) => string;
}

export const Features = (props: Props): JSX.Element => {
  const { t } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={8}>
          <div className={classes.featuresContainer}>
            <h3 className={classes.featuresTitle}>{t('features')}</h3>
          </div>
          <div className={classes.featuresContent}>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={4}>
                <Card>
                  <CardMedia
                    className={classes.media}
                    image={`${config.storageLocation.static}/images/intro1.jpg`}
                    title={t('feature1')}
                  />
                  <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                      {t('featureDescription1')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Card>
                  <CardMedia
                    className={classes.media}
                    image={`${config.storageLocation.static}/images/intro2.jpg`}
                    title={t('feature2')}
                  />
                  <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                      {t('featureDescription2')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Card>
                  <CardMedia
                    className={classes.media}
                    image={`${config.storageLocation.static}/images/intro3.jpg`}
                    title={t('feature3')}
                  />
                  <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                      {t('featureDescription3')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={1} lg={2}></Grid>
      </Grid>
    </div>
  );
};
