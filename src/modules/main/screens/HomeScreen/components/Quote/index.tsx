import React from 'react';
import { Grid } from '@material-ui/core';
import { config } from '@app/config';
import { useStyles } from './styles';

export const Quote = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={8}>
          <div className={classes.quoteContainer}>
            <h4 className={classes.quote}>
              &quot;Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae. Donec velit
              neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula&quot;
            </h4>
            <div className={classes.signatureContainer}>
              <div className={classes.signatureName}>Lionel Messi</div>
              <div className={classes.signatureJob}>Greatest footballer of all time</div>
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
