import React from 'react';
import clsx from 'clsx';
import { Button, ButtonProps } from '../Button';
import { Paper } from '../Paper';
import { Typography } from '../Typography';
import { useStyles } from './styles';

interface Props {
  title: string;
  commandButtons?: ButtonProps[];
}

export const FormHeader = (props: Props): JSX.Element => {
  const { commandButtons, title, ...other } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root} {...other}>
      <Typography color='textPrimary' variant='h6'>
        {title}
      </Typography>
      <div className={classes.separator}></div>
      <div className={classes.commands}>
        {!!commandButtons &&
          commandButtons.map((commandButton) => (
            <Button
              {...commandButton}
              key={commandButton.title}
              className={clsx(classes.button, commandButton.className)}
            >
              {commandButton.title}
            </Button>
          ))}
      </div>
    </Paper>
  );
};
