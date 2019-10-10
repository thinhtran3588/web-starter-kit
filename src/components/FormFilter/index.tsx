import React from 'react';
import { Grid } from '@material-ui/core';
import { FieldInfo, Filter, FieldValueType } from '@app/core';
import { Field } from '@app/components/Field';

interface Props {
  filter: Filter;
  filterFields?: FieldInfo[];
  children?: React.ReactNode;
  handleChange?: (fieldName: string) => (value: FieldValueType) => void;
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
            type={field.type || 'text'}
            label={field.text}
            onChange={handleChange ? handleChange(field.name) : undefined}
            pickerDataSources={field.pickerDataSources}
          />
        ))}
      {children}
    </Grid>
  );
};
