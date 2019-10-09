import React from 'react';
import { Grid } from '@material-ui/core';

interface Props {
  children?: React.ReactNode;
}

export const Form = (props: Props): JSX.Element => {
  const { children } = props;

  return (
    <Grid container spacing={1}>
      {children}
    </Grid>
  );
};
