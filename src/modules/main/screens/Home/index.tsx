import React from 'react';
import { Layout } from '@app/components';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

export const Home = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Layout description='Home page'>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.coverImage}>
            <Grid container>
              <Grid item xs={1} lg={2}></Grid>
              <Grid item xs={10} lg={4}>
                <h2 className={classes.title}>Praesent sapien massa, convallis a pellentesque nec</h2>
                <p className={classes.paragraph}>
                  Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis
                  ac lectus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Pellentesque in ipsum id
                  orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla quis lorem ut
                  libero malesuada feugiat.
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

          <div>
            <Grid container>
              <Grid item xs={1} lg={2}></Grid>
              <Grid item xs={10} lg={8}>
                <div className={classes.section2Container}>
                  <h3 className={classes.section2Title}>Praesent sapien massa, convallis a pellentesque nec</h3>
                </div>

                <div className={classes.section2Content}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} lg={4}>
                      <Card>
                        <CardMedia className={classes.media} image='/static/images/intro1.jpg' title='Paella dish' />
                        <CardContent>
                          <Typography variant='body2' color='textSecondary' component='p'>
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <Card>
                        <CardMedia className={classes.media} image='/static/images/intro2.jpg' title='Paella dish' />
                        <CardContent>
                          <Typography variant='body2' color='textSecondary' component='p'>
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <Card>
                        <CardMedia className={classes.media} image='/static/images/intro3.jpg' title='Paella dish' />
                        <CardContent>
                          <Typography variant='body2' color='textSecondary' component='p'>
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
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

          <div>
            <Grid container>
              <Grid item xs={1} lg={2}></Grid>
              <Grid item xs={10} lg={8}>
                <div className={classes.section2Container}>
                  <h4 className={classes.quote}>
                    &quot;Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae. Donec
                    velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula&quot;
                  </h4>
                  <div className={classes.signatureContainer}>
                    <div className={classes.signatureName}>Lionel Messi</div>
                    <div className={classes.signatureJob}>Greatest footballer of all time</div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={1} lg={2}></Grid>
            </Grid>
          </div>

          <div className={classes.coverImage2}></div>

          <div>
            <Grid container>
              <Grid item xs={1} lg={2}></Grid>
              <Grid item xs={10} lg={8}>
                <div className={classes.section2Container}>
                  <div>
                    <div className={classes.helpIconContainer}>
                      <img src='/static/images/faq.png' className={classes.helpIcon} />
                    </div>
                    <h4 className={classes.helpTitle}>Need help?</h4>
                  </div>
                  <div className={classes.helpInfo}>
                    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet
                    nisl tempus convallis quis ac lectus. Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia Curae
                  </div>
                  <div className={classes.helpContact}>support@mindxtech.com</div>
                </div>
              </Grid>
              <Grid item xs={1} lg={2}></Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
};
