import React from 'react';
import { CommandButton } from '@app/core';
import { Button } from '../Button';
import { Paper } from '../Paper';
import { Typography } from '../Typography';
import { useStyles } from './styles';

interface Props {
  title: string;
  commandButtons?: CommandButton[];
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
              key={commandButton.text}
              variant='contained'
              color={commandButton.color || 'primary'}
              className={classes.button}
              onClick={commandButton.onClick}
            >
              {commandButton.text}
            </Button>
          ))}
      </div>
    </Paper>
  );
};
