import React from 'react';
import { Grid } from '@material-ui/core';
import { config } from '@app/config';
import clsx from 'clsx';
import { useStyles } from './styles';

interface Props {
  t: (key: string) => string;
}

export const Help = (props: Props): JSX.Element => {
  const { t } = props;
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={8}>
          <div className={classes.helpContainer}>
            <div>
              <div className={classes.helpIconContainer}>
                <img
                  data-src={`${config.storageLocation.static}/images/faq.png`}
                  className={clsx(classes.helpIcon, 'lazyload')}
                  alt={t('needHelp')}
                />
              </div>
              <h4 className={classes.helpTitle}>{t('needHelp')}</h4>
            </div>
            <div className={classes.helpInfo}>{t('needHelpDescription')}</div>
            <div className={classes.helpContact}>{config.contactEmail}</div>
          </div>
        </Grid>
        <Grid item xs={1} lg={2}></Grid>
      </Grid>
    </div>
  );
};
