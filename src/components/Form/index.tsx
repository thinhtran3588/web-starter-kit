import React from 'react';
import { FieldInfo, FieldValueType } from '@app/core';
import { Formik, FormikConfig } from 'formik';
import { FormField } from '../FormField';
import { Grid, GridSize, Breakpoint } from '../Grid';

type Props<T> = FormikConfig<T> & {
  fields?: FieldInfo<T>[];
  children?: React.ReactNode;
  setForm?: (ref: Formik<T>) => void;
} & Partial<Record<Breakpoint, boolean | GridSize>>;

export const Form: <T>(props: Props<T>) => JSX.Element = (props) => {
  const { fields, children, setForm, initialValues, xs, sm, md, lg, xl, ...other } = props;

  return (
    <Formik
      validateOnChange={false}
      initialValues={initialValues}
      ref={(ref) => ref && setForm && setForm(ref)}
      {...other}
    >
      {(context) => {
        const handleChange = (fieldName: string) => (newValue: FieldValueType) => {
          context.setFieldValue(fieldName, newValue);
        };
        return (
          <form onSubmit={context.handleSubmit}>
            <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
              <Grid container spacing={1}>
                {fields &&
                  fields
                    .filter((m) => !m.hidden)
                    .map((field) => (
                      <FormField
                        key={field.name.toString()}
                        id={field.name.toString()}
                        label={field.label}
                        value={context.values[field.name]}
                        type={field.type}
                        onValueChange={handleChange(field.name.toString())}
                        error={context.touched[field.name] && !!context.errors[field.name]}
                        errorMessage={(context.errors[field.name] as unknown) as string}
                        onChange={context.handleChange}
                        onBlur={context.handleBlur}
                        pickerDataSources={field.pickerDataSources}
                        isPassword={field.isPassword}
                        disabled={field.disabled}
                        placeholder={field.placeholder}
                      />
                    ))}
                <Grid item xs={12}>
                  {children}
                </Grid>
              </Grid>
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
};
