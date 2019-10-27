import React from 'react';
import { Grid, Card, CardMedia, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { config } from '@app/config';
import { useStyles } from './styles';

export const SideMenu = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2} alignContent='stretch'>
        <Grid item xs={12}>
          <Card
            className={classes.card2}
            style={{
              backgroundImage: `url(/static/images/intro2.jpg)`,
            }}
          >
            <div>
              <h2 className={classes.categoriesTitle}>// This impressive paella</h2>
            </div>
            <div className={classes.categoriesButtonContainer}>
              <Button variant='contained' color='primary'>
                Explore
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            className={classes.card}
            style={{
              backgroundImage: `url(/static/images/intro1.jpg)`,
            }}
          >
            <div>
              <h2 className={classes.categoriesTitle}>// This impressive paella</h2>
            </div>
            <div className={classes.categoriesButtonContainer}>
              <Button variant='contained' color='primary'>
                Explore
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            className={classes.card3}
            style={{
              backgroundImage: `url(/static/images/intro3.jpg)`,
            }}
          >
            <div>
              <h2 className={classes.categoriesTitle}>// This impressive paella</h2>
            </div>
            <div className={classes.categoriesButtonContainer}>
              <Button variant='contained' color='primary'>
                Explore
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            className={classes.card4}
            style={{
              backgroundImage: `url(/static/images/intro4.jpg)`,
            }}
          >
            <div>
              <h2 className={classes.categoriesTitle}>// This impressive paella</h2>
            </div>
            <div className={classes.categoriesButtonContainer}>
              <Button variant='contained' color='primary'>
                Explore
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid>

      <div>
        <h3 className={classes.alsoWatch}>Views also watch</h3>
        <div>
          <Card className={classes.relatedCard}>
            <CardMedia
              className={classes.media}
              image={`${config.storageLocation.static}/images/intro3.png`}
              title='Contemplative Reptile'
            />
            <div>
              <Typography variant='body2' color='textSecondary' component='p'>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species
              </Typography>
            </div>
          </Card>
          <Card className={classes.relatedCard}>
            <CardMedia
              className={classes.media}
              image={`${config.storageLocation.static}/images/intro2.png`}
              title='Contemplative Reptile'
            />
            <div>
              <Typography variant='body2' color='textSecondary' component='p'>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species
              </Typography>
            </div>
          </Card>
          <Card className={classes.relatedCard}>
            <CardMedia
              className={classes.media}
              image={`${config.storageLocation.static}/images/intro1.png`}
              title='Contemplative Reptile'
            />
            <div>
              <Typography variant='body2' color='textSecondary' component='p'>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species
              </Typography>
            </div>
          </Card>
          <Card className={classes.relatedCard}>
            <CardMedia
              className={classes.media}
              image={`${config.storageLocation.static}/images/intro4.png`}
              title='Contemplative Reptile'
            />
            <div>
              <Typography variant='body2' color='textSecondary' component='p'>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
