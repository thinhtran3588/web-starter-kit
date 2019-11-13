/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { NoSsr, Loading } from '@app/components';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(() => ({
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
}));

export const withNoSsr = (PageComponent: any): any => {
  const WithNoSsr = (props: any): any => {
    const classes = useStyles();
    return (
      <NoSsr
        fallback={
          <div className={classes.loadingContainer}>
            <Loading />
          </div>
        }
      >
        <PageComponent {...props} />
      </NoSsr>
    );
  };
  return WithNoSsr;
};
