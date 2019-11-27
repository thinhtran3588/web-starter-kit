import React from 'react';
import { useTheme } from '@material-ui/styles';
import { useMediaQuery, Theme, PropTypes } from '@material-ui/core';
import { FieldInfo, FieldValueType, FieldType } from '@app/core';
import { Formik, FormikConfig, FormikProps } from 'formik';
import clsx from 'clsx';
import { FormField } from '../FormField';
import { Grid, GridSize, Breakpoint } from '../Grid';
import { Button } from '../Button';
import { useStyles } from './styles';

type Props<T> = FormikConfig<T> & {
  fields?: FieldInfo<T>[];
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
  setForm?: (ref: Formik<T>) => void;
  isBusy: boolean;
} & Partial<Record<Breakpoint, boolean | GridSize>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleChange = (fieldName: string, context: FormikProps<any>, type?: FieldType) => (newValue: FieldValueType) => {
  const value = (!type || type === 'picker') && !newValue ? '' : newValue;
  context.setFieldValue(fieldName, value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderFormField = (field: FieldInfo<any>, context: FormikProps<any>, isBusy: boolean): JSX.Element => (
  <Grid key={field.name.toString()} item xs={field.xs || 12} sm={field.sm} md={field.md} lg={field.lg} xl={field.xl}>
    {!field.customRender && (
      <FormField
        id={field.name.toString()}
        label={field.label}
        value={context.values[field.name]}
        type={field.type}
        onValueChange={handleChange(field.name.toString(), context, field.type)}
        error={context.touched[field.name.toString()] && !!context.errors[field.name.toString()]}
        errorMessage={(context.errors[field.name.toString()] as unknown) as string}
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
);

export const Form: <T>(props: Props<T>) => JSX.Element = (props) => {
  const { fields, children, setForm, initialValues, isBusy, buttons, xs, sm, md, lg, xl, ...other } = props;
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
        return (
          <form onSubmit={context.handleSubmit}>
            <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Grid container spacing={1}>
                {fields && fields.filter((m) => !m.hidden).map((field) => renderFormField(field, context, isBusy))}
                <Grid item xs={12}>
                  {!!buttons && (
                    <div className={clsx(isDesktop && classes.buttonContainer)}>
                      {buttons
                        .filter((button) => !button.hidden)
                        .map((button) => (
                          <Button
                            key={button.key || button.title}
                            disabled={button.disabled || isBusy}
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
                  {typeof children === 'function' ? children(context) : children}
                </Grid>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
};
