import React from 'react';
import { Grid } from '@material-ui/core';
import { Filter, FieldValueType } from '@app/core';
import { Field } from '@app/components/Field';

interface Props {
  filter: Filter;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterFields?: any[];
  children?: React.ReactNode;
  handleChange?: (fieldName: string) => (value: FieldValueType, useDebounce: boolean) => void;
}

export const FormFilter = (props: Props): JSX.Element => {
  const { children, filter, filterFields, handleChange } = props;

  return (
    <Grid container spacing={1}>
      {filterFields &&
        filterFields.map((field) => (
          <Field
            key={field.name}
            id={field.name}
            value={filter ? filter[field.name] : undefined}
            type={field.type}
            label={field.text}
            onValueChange={handleChange ? handleChange(field.name) : undefined}
            pickerDataSources={field.pickerDataSources}
          />
        ))}
      {children}
    </Grid>
  );
};
