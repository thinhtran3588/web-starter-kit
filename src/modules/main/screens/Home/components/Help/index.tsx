import React from 'react';
import { Grid } from '@material-ui/core';
import { config } from '@app/config';
import { useStyles } from './styles';

export const Help = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={8}>
          <div className={classes.helpContainer}>
            <div>
              <div className={classes.helpIconContainer}>
                <img src={`${config.storageLocation.static}/images/faq.png`} className={classes.helpIcon} />
              </div>
              <h4 className={classes.helpTitle}>Need help?</h4>
            </div>
            <div className={classes.helpInfo}>
              Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl
              tempus convallis quis ac lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia Curae
            </div>
            <div className={classes.helpContact}>support@mindxtech.com</div>
          </div>
        </Grid>
        <Grid item xs={1} lg={2}></Grid>
      </Grid>
    </div>
  );
};
