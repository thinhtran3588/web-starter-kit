import React from 'react';
import { useTheme, useMediaQuery, Theme } from '@material-ui/core';
import { FieldInfo } from '@app/core';
import { Formik, FormikConfig } from 'formik';
import clsx from 'clsx';
import { TransitionProps } from '@material-ui/core/transitions';
import { Form } from '../Form';
import { Slide } from '../Slide';
import { GridSize, Breakpoint, Grid } from '../Grid';
import { Dialog, DialogContent, DialogActions } from '../Dialog';
import { Button, ButtonProps } from '../Button';
import { useStyles } from './styles';
import { AppBar } from '../AppBar';
import { Typography } from '../Typography';

type Props<T> = FormikConfig<T> & {
  title: string;
  open: boolean;
  onClose: () => void;
  fields?: FieldInfo<T>[];
  buttons?: ButtonProps[];
  children?: React.ReactNode;
  setForm?: (ref: Formik<T>) => void;
  isBusy: boolean;
  fullScreen?: boolean;
  fullWidth?: boolean;
} & Partial<Record<Breakpoint, boolean | GridSize>>;

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const FormDialog: <T>(props: Props<T>) => JSX.Element = (props) => {
  const { title, open, onClose, isBusy, buttons, fullScreen, fullWidth, ...other } = props;
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
      fullWidth={fullWidth !== false}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Typography variant='h6'>{title}</Typography>
      </AppBar>
      <DialogContent className={classes.content}>
        <Form {...other} isBusy={isBusy}></Form>
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
