import React from 'react';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';

export const Categories = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.categoriesContainer}>
      <Grid container spacing={2} alignContent='stretch'>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <div>
                  <h2 className={classes.categoriesTitle}>// This impressive paella</h2>
                  <p className={classes.categoriesDescription}>
                    Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet
                    quam vehicula elementum sed sit amet dui
                  </p>
                </div>
                <div className={classes.categoriesButtonContainer}>
                  <Button variant='contained' color='primary'>
                    Explore
                  </Button>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card2}>
                <div>
                  <h2 className={classes.categoriesTitle}>// This impressive paella</h2>
                  <p className={classes.categoriesDescription}>
                    Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet
                    quam vehicula elementum sed sit amet dui
                  </p>
                </div>
                <div className={classes.categoriesButtonContainer}>
                  <Button variant='contained' color='primary'>
                    Explore
                  </Button>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Card className={classes.card3}>
            <div>
              <h2 className={classes.categoriesTitle}>// This impressive paella</h2>
              <p className={classes.categoriesDescription}>
                Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam
                vehicula elementum sed sit amet dui
              </p>
            </div>
            <div className={classes.categoriesButtonContainer}>
              <Button variant='contained' color='primary'>
                Explore
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Card className={classes.card4}>
            <div>
              <h2 className={classes.categoriesTitle}>// This impressive paella</h2>
              <p className={classes.categoriesDescription}>
                Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vestibulum ac diam sit amet quam
                vehicula elementum sed sit amet dui
              </p>
            </div>
            <div className={classes.categoriesButtonContainer}>
              <Button variant='contained' color='primary'>
                Explore
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
