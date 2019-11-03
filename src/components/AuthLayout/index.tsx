import React from 'react';
import { config } from '@app/config';
import { Typography } from '../Typography';
import { Head } from '../Head';
import { useStyles } from './styles';

interface Props {
  children?: JSX.Element;
  title?: string;
  description?: string;
}

export const AuthLayout = (props: Props): JSX.Element => {
  const { title, description, children } = props;
  const classes = useStyles();

  return (
    <div
      className={classes.container}
      style={{
        background: `url(${config.storageLocation.static}/images/auth-background.jpg) no-repeat center center`,
      }}
    >
      <Head title={title} description={description} />
      <div className={classes.form}>
        <div className={classes.logoText}>
          <Typography variant='h4'>{config.siteName}</Typography>
        </div>
        {children}
      </div>
    </div>
  );
};
