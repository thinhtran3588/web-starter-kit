import React from 'react';
import { FieldValueType, FieldInfo, FieldType } from '@app/core';
import { FormField } from '../FormField';
import { Grid } from '../Grid';

interface Props {
  filter: Record<string, FieldValueType>;
  filterFields: FieldInfo<Record<string, FieldValueType>>[];
  children?: React.ReactNode;
  handleChange: (fieldName: string) => (value: FieldValueType, useDebounce: boolean) => void;
}

export const FormFilter: (props: Props) => JSX.Element = (props) => {
  const { children, filter, filterFields, handleChange } = props;
  const handleValueChange = (fieldName: string, type?: FieldType) => (newValue: FieldValueType) => {
    const value = (!type || type === 'picker') && !newValue ? '' : newValue;
    handleChange(fieldName)(value, !type || type === 'text');
  };

  return (
    <Grid container spacing={1}>
      {filterFields &&
        filterFields
          .filter((m) => !m.hidden)
          .map((field) => (
            <Grid
              key={field.name.toString()}
              item
              xs={field.xs || 12}
              sm={field.sm}
              md={field.md || 6}
              lg={field.lg || 4}
              xl={field.xl || 3}
            >
              <FormField
                id={field.name.toString()}
                label={field.label}
                value={filter ? filter[field.name.toString()] : undefined}
                type={field.type}
                onValueChange={handleValueChange(field.name.toString(), field.type)}
                pickerDataSources={field.pickerDataSources}
                isPassword={field.isPassword}
                disabled={field.disabled}
                placeholder={field.placeholder}
              />
            </Grid>
          ))}
      {children}
    </Grid>
  );
};
