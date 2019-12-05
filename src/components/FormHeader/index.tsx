import React from 'react';
import clsx from 'clsx';
import { useTheme, useMediaQuery, Theme } from '@material-ui/core';
import { Button, ButtonProps } from '../Button';
import { Paper } from '../Paper';
import { Typography } from '../Typography';
import { useStyles } from './styles';

interface Props {
  title: string;
  commandButtons?: (ButtonProps | false)[];
}

export const FormHeader = (props: Props): JSX.Element => {
  const { commandButtons, title, ...other } = props;
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Paper className={classes.root} {...other}>
      <Typography color='textPrimary' variant='h6' className={clsx(!isDesktop && classes.mobileTitle)}>
        {title}
      </Typography>
      <div className={classes.separator}></div>
      <div className={clsx(!isDesktop && classes.mobileButtonContainer)}>
        {!!commandButtons &&
          commandButtons
            .filter((button) => !!button)
            .map((button) => button as ButtonProps)
            .map((commandButton: ButtonProps) => (
              <Button
                {...commandButton}
                key={commandButton.title}
                className={clsx(isDesktop ? classes.button : classes.mobileButton, commandButton.className)}
                fullWidth={!isDesktop}
              >
                {commandButton.title}
              </Button>
            ))}
      </div>
    </Paper>
  );
};
