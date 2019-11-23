import React from 'react';
import { PropTypes, useTheme, useMediaQuery, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { TransitionProps } from '@material-ui/core/transitions';
import { Slide } from '../Slide';
import { Grid } from '../Grid';
import { Dialog, DialogContent, DialogActions, DialogContentText } from '../Dialog';
import { Button } from '../Button';
import { useStyles } from './styles';
import { AppBar } from '../AppBar';
import { Typography } from '../Typography';

interface Props {
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  buttons?: {
    key?: string;
    disabled?: boolean;
    hidden?: boolean;
    type?: 'submit' | 'reset' | 'button';
    variant?: 'text' | 'outlined' | 'contained';
    color?: PropTypes.Color;
    title?: string;
    onClick?: () => void;
  }[];
  fullScreen?: boolean;
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const ConfirmationDialog: (props: Props) => JSX.Element = (props) => {
  const { title, open, onClose, buttons, fullScreen, message } = props;
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={title}
      fullScreen={fullScreen}
      TransitionComponent={Transition}
      fullWidth
    >
      <AppBar className={classes.appBar}>
        <Typography variant='h6'>{title}</Typography>
      </AppBar>
      <DialogContent className={classes.content}>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid item xs={12}>
          {!!buttons && (
            <div className={clsx(isDesktop && classes.buttonContainer)}>
              {buttons
                .filter((button) => !button.hidden)
                .map((button) => (
                  <Button
                    key={button.key || button.title}
                    disabled={button.disabled}
                    type={button.type}
                    variant={button.variant || 'contained'}
                    color={button.color}
                    className={isDesktop ? classes.button : classes.mobileButton}
                    fullWidth={!isDesktop}
                    onClick={button.onClick}
                  >
                    {button.title}
                  </Button>
                ))}
            </div>
          )}
        </Grid>
      </DialogActions>
    </Dialog>
  );
};
