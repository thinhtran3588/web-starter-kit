import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useStyles } from './styles';

export const BlogsList = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.blogsListContainer}>
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <Grid container className={classes.grid} key={item}>
            <Grid item xs={12} md={4}>
              <div className={classes.blogImage}></div>
            </Grid>
            <Grid item xs={12} md={8} className={classes.bloginContentContainer}>
              <div>
                <h2 className={classes.blogTitle}>
                  Nulla porttitor accumsan tincidunt. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
                </h2>
                <p className={classes.blogDescription}>
                  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit
                  neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ante ipsum primis in
                  faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam
                  vel, ullamcorper sit amet ligula. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
                  Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
                </p>
              </div>
              <div className={classes.blogItemFooter}>
                <div>
                  Author: <span className={classes.boldText}>Lorem ipsum</span> | Category:{' '}
                  <span className={classes.boldText}>Vivamus suscipit</span>
                </div>
                <div>
                  <Button variant='contained' color='primary'>
                    See more
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};
