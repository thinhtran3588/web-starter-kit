import React from 'react';
import { useTheme, useMediaQuery, Theme } from '@material-ui/core';
import { FieldInfo, FieldType, FieldValueType } from '@app/core';
import { Formik, FormikConfig } from 'formik';
import clsx from 'clsx';
import { TransitionProps } from '@material-ui/core/transitions';
import { Slide } from '../Slide';
import { GridSize, Breakpoint, Grid } from '../Grid';
import { Dialog, DialogContent, DialogActions } from '../Dialog';
import { Button, ButtonProps } from '../Button';
import { useStyles } from './styles';
import { AppBar } from '../AppBar';
import { Typography } from '../Typography';
import { FormField } from '../FormField';

type Props<T> = FormikConfig<T> & {
  title: string;
  open: boolean;
  onClose: () => void;
  fields?: FieldInfo<T>[];
  buttons?: ButtonProps[];
  setForm?: (ref: Formik<T>) => void;
  isBusy: boolean;
  fullScreen?: boolean;
  fullWidth?: boolean;
  noPadding?: boolean;
} & Partial<Record<Breakpoint, boolean | GridSize>>;

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const FormDialog: <T>(props: Props<T>) => JSX.Element = (props) => {
  const {
    title,
    open,
    onClose,
    isBusy,
    buttons,
    fullScreen,
    fullWidth,
    initialValues,
    setForm,
    fields,
    children,
    noPadding,
    ...other
  } = props;
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Formik
      validateOnChange={false}
      initialValues={initialValues}
      enableReinitialize
      ref={(ref) => ref && setForm && setForm(ref)}
      {...other}
    >
      {(context) => {
        const handleChange = (fieldName: string, type?: FieldType) => (newValue: FieldValueType) => {
          const value = (!type || type === 'picker') && !newValue ? '' : newValue;
          context.setFieldValue(fieldName, value);
        };
        return (
          <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby={title}
            fullScreen={fullScreen}
            fullWidth={fullWidth !== false}
            TransitionComponent={Transition}
          >
            <form onSubmit={context.handleSubmit} className={classes.form}>
              <AppBar className={classes.appBar}>
                <Typography variant='h6'>{title}</Typography>
              </AppBar>
              <DialogContent className={clsx(classes.content, noPadding && classes.noPadding)}>
                <Grid container spacing={1}>
                  {fields &&
                    fields
                      .filter((m) => !m.hidden)
                      .map((field) => (
                        <Grid
                          key={field.name.toString()}
                          item
                          xs={field.xs || 12}
                          sm={field.sm}
                          md={field.md}
                          lg={field.lg}
                          xl={field.xl}
                        >
                          {!field.customRender && (
                            <FormField
                              id={field.name.toString()}
                              label={field.label}
                              value={context.values[field.name]}
                              type={field.type}
                              onValueChange={handleChange(field.name.toString(), field.type)}
                              error={context.touched[field.name] && !!context.errors[field.name]}
                              errorMessage={(context.errors[field.name] as unknown) as string}
                              onChange={context.handleChange}
                              onBlur={context.handleBlur}
                              pickerDataSources={field.pickerDataSources}
                              isPassword={field.isPassword}
                              disabled={field.disabled || isBusy}
                              placeholder={field.placeholder}
                            />
                          )}
                          {!!field.customRender &&
                            field.customRender({
                              data: context.values,
                              setFieldValue: context.setFieldValue,
                            })}
                        </Grid>
                      ))}
                  {typeof children === 'function' ? children(context) : children}
                </Grid>
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
            </form>
          </Dialog>
        );
      }}
    </Formik>
  );
};
