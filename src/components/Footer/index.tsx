import React from 'react';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import { useStyles } from './styles';

export const Footer = (): JSX.Element => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant='body1'>
        &copy;{' '}
        <Link href='/'>
          <a>Thinh Tran</a>
        </Link>
        &nbsp;2019
      </Typography>
      <Typography variant='caption'>Created with love!</Typography>
    </footer>
  );
};
