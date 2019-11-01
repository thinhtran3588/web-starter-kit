import React from 'react';
import dynamic from 'next/dynamic';
import { TextField, FormControl, FormHelperText } from '@material-ui/core';
import { PickerDataItem, FieldType, FieldValueType } from '@app/core';
import { useStyles } from './styles';

const Autocomplete = dynamic(() => import('@app/components/Autocomplete'));

interface Props<T extends FieldValueType> {
  id?: string;
  label: string;
  value: T;
  isPassword?: boolean;
  type?: FieldType;
  pickerDataSources?: PickerDataItem<T>[];
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onValueChange?: (value: FieldValueType, useDebounce: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: React.ChangeEvent<any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur?: (e: React.ChangeEvent<any>) => void;
}

type FormField = <T extends FieldValueType>(props: Props<T>) => JSX.Element;

export const FormField: FormField = (props) => {
  const {
    label,
    value,
    type = 'text',
    id,
    onValueChange,
    isPassword,
    pickerDataSources,
    error,
    errorMessage,
    disabled,
    onChange,
    onBlur,
    ...other
  } = props;
  const classes = useStyles();

  const onFieldValueChange = (newValue: string | number | undefined, useDebounce?: boolean): void => {
    onValueChange && onValueChange(newValue, useDebounce === true);
  };
  const onTextValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onFieldValueChange(event.target.value, true);
  };

  return (
    <FormControl className={classes.formControl}>
      {type === 'text' && (
        <TextField
          id={id}
          label={label}
          value={value}
          onChange={onChange || onTextValueChange}
          onBlur={onBlur}
          margin='dense'
          fullWidth
          type={isPassword ? 'password' : ''}
          error={error}
          disabled={disabled}
          {...other}
        />
      )}
      {type === 'picker' && (
        <Autocomplete
          id={id}
          label={label}
          value={value}
          onChange={onFieldValueChange}
          pickerDataSources={pickerDataSources}
          error={error}
          disabled={disabled}
        />
      )}
      {error && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};
