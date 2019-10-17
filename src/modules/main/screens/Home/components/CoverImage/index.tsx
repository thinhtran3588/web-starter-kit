import React from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';

export const CoverImage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.coverImage}>
      <Grid container>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={4}>
          <h2 className={classes.title}>Praesent sapien massa, convallis a pellentesque nec</h2>
          <p className={classes.paragraph}>
            Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac
            lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Pellentesque in ipsum id orci porta
            dapibus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla quis lorem ut libero malesuada
            feugiat.
          </p>
          <div className={classes.introButtonContainer}>
            <Button variant='contained' color='primary'>
              Explore
            </Button>
          </div>
        </Grid>
        <Grid item xs={1} lg={2}></Grid>
      </Grid>
    </div>
  );
};
