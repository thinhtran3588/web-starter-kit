import React from 'react';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

export const Features = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={8}>
          <div className={classes.featuresContainer}>
            <h3 className={classes.featuresTitle}>Praesent sapien massa, convallis a</h3>
          </div>

          <div className={classes.featuresContent}>
            <Grid container spacing={4}>
              <Grid item xs={12} lg={4}>
                <Card>
                  <CardMedia className={classes.media} image='/static/images/intro1.jpg' title='Paella dish' />
                  <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                      This impressive paella is a perfect party dish and a fun meal to cook together with your guests.
                      Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Card>
                  <CardMedia className={classes.media} image='/static/images/intro2.jpg' title='Paella dish' />
                  <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                      This impressive paella is a perfect party dish and a fun meal to cook together with your guests.
                      Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Card>
                  <CardMedia className={classes.media} image='/static/images/intro3.jpg' title='Paella dish' />
                  <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                      This impressive paella is a perfect party dish and a fun meal to cook together with your guests.
                      Add 1 cup of frozen peas along with the mussels, if you like.
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
