import React from 'react';
import dynamic from 'next/dynamic';
import { Grid, TextField } from '@material-ui/core';
import clsx from 'clsx';
import { PickerDataItem, FieldType, FieldValueType } from '@app/core';
// import { Autocomplete } from '@app/components';
import { useStyles } from './styles';

const Autocomplete = dynamic(() => import('@app/components/Autocomplete'));

interface Props<T extends FieldValueType> {
  id?: string;
  label: string;
  value: T;
  onChange?: (value: FieldValueType) => void;
  className?: string;

  xs?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  sm?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  md?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  lg?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  xl?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  layout?: 'default';

  // error?: boolean;
  // success?: boolean;
  // errorColor?: string;
  // successColor?: string;
  // errorMessage?: string;
  // hasTooltip?: boolean;
  // tooltipHeight?: number;
  // tooltipWidth?: number;
  // tooltipText?: string;
  // onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  isPassword?: boolean;
  type?: FieldType;
  pickerDataSources?: PickerDataItem<T>[];
  // placeHolderTextColor?: string;
  // hasPassword?: boolean;
  // datePickerFromYear?: number;
  // datePickerToYear?: number;
  // inputTextColor?: string;
}

type Field = <T extends FieldValueType>(props: Props<T>) => JSX.Element;

export const Field: Field = (props) => {
  const {
    label,
    value,
    type = 'text',
    id,
    onChange,
    className,
    isPassword,
    layout = 'default',
    pickerDataSources,
    ...other
  } = props;
  let { xs, sm, md, lg } = props;
  switch (layout) {
    case 'default':
      xs = xs || 12;
      sm = sm || 6;
      md = md || 4;
      lg = lg || 3;
      break;
    default:
      break;
  }
  const classes = useStyles();

  const onValueChange = (newValue: string | number | undefined): void => {
    onChange && onChange(newValue);
  };
  const onTextValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onValueChange(event.target.value);
  };

  return (
    <Grid xs={xs} sm={sm} md={md} lg={lg} item>
      {type === 'text' && (
        <TextField
          id={id}
          label={label}
          className={clsx(classes.textField, className)}
          value={value}
          onChange={onTextValueChange}
          margin='dense'
          fullWidth
          type={isPassword ? 'password' : ''}
          {...other}
        />
      )}
      {type === 'picker' && (
        <Autocomplete
          id={id}
          label={label}
          value={value}
          onChange={onValueChange}
          pickerDataSources={pickerDataSources}
        />
      )}
    </Grid>
  );
};
