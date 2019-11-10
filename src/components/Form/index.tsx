import React from 'react';
import { FieldInfo, FieldValueType } from '@app/core';
import { Formik, FormikConfig } from 'formik';
import { FormField } from '../FormField';

interface Props<T> extends FormikConfig<T> {
  fields?: FieldInfo<T>[];
  children?: React.ReactNode;
  setForm?: (ref: Formik<T>) => void;
}

export const Form: <T>(props: Props<T>) => JSX.Element = (props) => {
  const { fields, children, setForm, initialValues, ...other } = props;

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
                  />
                ))}
            {children}
          </form>
        );
      }}
    </Formik>
  );
};
