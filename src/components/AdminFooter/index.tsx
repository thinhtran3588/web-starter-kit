import React from 'react';
import { Link } from '@app/components';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';

export const AdminFooter = (): JSX.Element => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant='body1'>
        &copy; <Link href='/'>Thinh Tran</Link>
        &nbsp;2019
      </Typography>
      <Typography variant='caption'>Created with love!</Typography>
    </footer>
  );
};
