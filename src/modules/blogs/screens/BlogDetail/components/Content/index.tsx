import React from 'react';
import {
  Breadcrumbs,
  Typography,
  Link,
  Avatar,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useStyles } from './styles';

export const Content = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.coverImage} />

      <div className={classes.breadCrum}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} aria-label='breadcrumb'>
          <Link color='inherit' href='/'>
            Home
          </Link>
          <Link color='inherit' href='/blogs'>
            Tech startup
          </Link>
          <Typography color='textPrimary'>Sound magic</Typography>
        </Breadcrumbs>
      </div>

      <h1 className={classes.title}>
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque,
        auctor sit amet aliquam vel
      </h1>

      <div className={classes.author}>
        <div className={classes.authorAvatar}>
          <Avatar className={classes.purpleAvatar}>N</Avatar>
        </div>
        <div>
          <div className={classes.authorName}>El pulga</div>
          <div>17/10/2019 | Views: 2211</div>
        </div>
      </div>

      <div>
        <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque,
          auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur arcu erat, accumsan id imperdiet et,
          porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada
          feugiat. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh
          pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla porttitor accumsan
          tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a
          pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl
          tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
          ullamcorper sit amet ligula. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien
          massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in ipsum id orci porta dapibus.
          Pellentesque in ipsum id orci porta dapibus.
        </p>
        <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque,
          auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur arcu erat, accumsan id imperdiet et,
          porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada
          feugiat. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh
          pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla porttitor accumsan
          tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a
          pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl
          tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
          ullamcorper sit amet ligula. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien
          massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in ipsum id orci porta dapibus.
          Pellentesque in ipsum id orci porta dapibus.
        </p>
        <div>
          <img src='/static/images/intro1.jpg' className={classes.image1} />
        </div>
        <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque,
          auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur arcu erat, accumsan id imperdiet et,
          porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada
          feugiat. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh
          pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla porttitor accumsan
          tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a
          pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl
          tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
          ullamcorper sit amet ligula. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien
          massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in ipsum id orci porta dapibus.
          Pellentesque in ipsum id orci porta dapibus.
        </p>
        <div>
          <img src='/static/images/intro2.jpg' className={classes.image1} />
        </div>
        <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque,
          auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur arcu erat, accumsan id imperdiet et,
          porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada
          feugiat. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh
          pulvinar a. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla porttitor accumsan
          tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a
          pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl
          tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
          ullamcorper sit amet ligula. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien
          massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in ipsum id orci porta dapibus.
          Pellentesque in ipsum id orci porta dapibus.
        </p>
      </div>

      <div>
        <h3 className={classes.relatedTopic}>Related topics</h3>
        <Grid container spacing={2} alignItems='stretch' direction='row' justify='space-between'>
          <Grid item xs={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.media} image='/static/images/intro3.jpg' title='Contemplative Reptile' />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Lizard
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all.
                    ranging across all. ranging across all
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size='small' color='primary'>
                  Share
                </Button>
                <Button size='small' color='primary'>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.media} image='/static/images/intro4.jpg' title='Contemplative Reptile' />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Lizard
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size='small' color='primary'>
                  Share
                </Button>
                <Button size='small' color='primary'>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.media} image='/static/images/intro2.jpg' title='Contemplative Reptile' />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Lizard
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size='small' color='primary'>
                  Share
                </Button>
                <Button size='small' color='primary'>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia className={classes.media} image='/static/images/intro1.jpg' title='Contemplative Reptile' />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Lizard
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size='small' color='primary'>
                  Share
                </Button>
                <Button size='small' color='primary'>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
