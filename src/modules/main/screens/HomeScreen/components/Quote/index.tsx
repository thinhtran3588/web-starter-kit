import React from 'react';
import { config } from '@app/config';
import { Grid } from '@app/components';
import { useStyles } from './styles';

interface Props {
  t: (key: string) => string;
}

export const Quote = (props: Props): JSX.Element => {
  const { t } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={8}>
          <div className={classes.quoteContainer}>
            <h4 className={classes.quote}>&quot;{t('quote')}&quot;</h4>
            <div className={classes.signatureContainer}>
              <div className={classes.signatureName}>{t('quoteFrom')}</div>
              <div className={classes.signatureJob}>{t('quoteFromTitle')}</div>
            </div>
          </div>
        </Grid>
        <Grid item xs={1} lg={2}></Grid>
      </Grid>
      <div
        className={classes.coverImage2}
        style={{
          backgroundImage: `url(${config.storageLocation.static}/images/cover2.jpg)`,
        }}
      ></div>
    </div>
  );
};
