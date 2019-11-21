import React from 'react';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import { PickerDataItem, FieldType, FieldValueType } from '@app/core';
import { config } from '@app/config';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import clsx from 'clsx';
import { TextField } from '../TextField';
import { DatePicker } from '../DatePicker';
import { TimePicker } from '../TimePicker';
import { FormControl } from '../FormControl';
import { FormHelperText } from '../FormHelperText';
import { useStyles } from './styles';
import { FormControlLabel } from '../FormControlLabel';
import { Switch } from '../Switch';
import { Checkbox } from '../Checkbox';

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
  placeholder?: string;
  onValueChange?: (value: FieldValueType, useDebounce: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: React.ChangeEvent<any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur?: (e: React.ChangeEvent<any>) => void;
  className?: string;
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
    placeholder,
    className,
    ...other
  } = props;
  const classes = useStyles();

  const onFieldValueChange = (newValue: FieldValueType, useDebounce?: boolean): void => {
    onValueChange && onValueChange(newValue, useDebounce === true);
  };
  const onTextValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onFieldValueChange(event.target.value, true);
  };

  const convertToDate = (dateValue: string | undefined): Date | null => {
    if (!dateValue) {
      // eslint-disable-next-line no-null/no-null
      return null;
    }
    return dayjs()
      .set('date', parseInt(dateValue.substr(6, 2), 10))
      .set('month', parseInt(dateValue.substr(4, 2), 10))
      .set('year', parseInt(dateValue.substr(0, 4), 10))
      .toDate();
  };
  const handleDateChange = (date: MaterialUiPickersDate | null, _value?: string | null): void => {
    onValueChange && onValueChange(date ? date.format('YYYYMMDD') : '', false);
  };

  const convertToTime = (timeValue: string | undefined): Date | null => {
    if (!timeValue) {
      // eslint-disable-next-line no-null/no-null
      return null;
    }
    return dayjs()
      .set('hour', parseInt(timeValue.substr(0, 2), 10))
      .set('minute', parseInt(timeValue.substr(2, 2), 10))
      .toDate();
  };
  const handleTimeChange = (date: MaterialUiPickersDate | null, _value?: string | null): void => {
    date && onValueChange && onValueChange(date.format('HHmm'), false);
  };
  const onSwitchValueChange = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    onValueChange && onValueChange(checked, false);
  };
  return (
    <FormControl className={clsx(classes.formControl, className)}>
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
          placeholder={placeholder}
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
          placeholder={placeholder}
        />
      )}
      {type === 'datepicker' && (
        <DatePicker
          margin='dense'
          id={id}
          label={label}
          format={config.dateFormat}
          value={convertToDate(value as string)}
          onChange={handleDateChange}
          error={error}
          disabled={disabled}
          placeholder={placeholder}
          KeyboardButtonProps={{
            'aria-label': 'Change date',
          }}
        />
      )}
      {type === 'timepicker' && (
        <TimePicker
          margin='dense'
          id={id}
          label={label}
          format={config.timeFormat}
          value={convertToTime(value as string)}
          onChange={handleTimeChange}
          error={error}
          disabled={disabled}
          placeholder={placeholder}
          KeyboardButtonProps={{
            'aria-label': 'Change time',
          }}
        />
      )}
      {type === 'switch' && (
        <FormControlLabel
          id={id}
          control={<Switch checked={value as boolean} value={value as boolean} onChange={onSwitchValueChange} />}
          label={label}
        />
      )}
      {type === 'checkbox' && (
        <FormControlLabel
          id={id}
          control={<Checkbox checked={value as boolean} value={value as boolean} onChange={onSwitchValueChange} />}
          label={label}
        />
      )}
      {error && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};
