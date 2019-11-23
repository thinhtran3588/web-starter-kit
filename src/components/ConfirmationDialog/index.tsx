import React from 'react';
import { useTheme, useMediaQuery, Theme } from '@material-ui/core';
import clsx from 'clsx';
import { TransitionProps } from '@material-ui/core/transitions';
import { Color } from '@app/core';
import { Slide } from '../Slide';
import { Grid } from '../Grid';
import { Dialog, DialogContent, DialogActions, DialogContentText } from '../Dialog';
import { Button, ButtonProps } from '../Button';
import { useStyles } from './styles';
import { AppBar } from '../AppBar';
import { Typography } from '../Typography';

interface Props {
  title: string;
  message: string;
  open: boolean;
  onClose: () => void;
  buttons?: ButtonProps[];
  fullScreen?: boolean;
  isBusy?: boolean;
  color?: Color;
}

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const ConfirmationDialog: (props: Props) => JSX.Element = (props) => {
  const { title, open, onClose, buttons, fullScreen, message, isBusy, color } = props;
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
      <AppBar className={classes.appBar} color={color}>
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
                    {...button}
                    key={button.key || button.title}
                    disabled={button.disabled || isBusy}
                    className={isDesktop ? classes.button : classes.mobileButton}
                    fullWidth={!isDesktop}
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
