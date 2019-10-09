import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import classNames from 'classnames';
import { useStyles } from './styles';

interface Props<T> {
  id?: string;
  label: string;
  value: T;
  onChange?: (text: string) => void;
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
  type?: 'text' | 'picker' | 'datepicker';
  // pickerDataSources?: PickerDataItem<T>[];
  // placeHolderTextColor?: string;
  // hasPassword?: boolean;
  // datePickerFromYear?: number;
  // datePickerToYear?: number;
  // inputTextColor?: string;
}

type Field = <T>(props: Props<T>) => JSX.Element;

export const Field: Field = (props) => {
  const { label, value, type = 'text', id, onChange, className, isPassword, layout = 'default', ...other } = props;
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
  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange && onChange(event.target.value);
  };

  return (
    <Grid xs={xs} sm={sm} md={md} lg={lg} item>
      {type === 'text' && (
        <TextField
          id={id}
          label={label}
          className={classNames(classes.textField, className)}
          value={value}
          onChange={onValueChange}
          margin='dense'
          fullWidth
          type={isPassword ? 'password' : ''}
          {...other}
        />
      )}
      {
        // type === 'picker' && (
        // <Select
        //   classes={classes}
        //   styles={selectStyles}
        //   inputId={id}
        //   TextFieldProps={{
        //     label,
        //     InputLabelProps: {
        //       htmlFor: id,
        //       shrink: true,
        //     },
        //   }}
        //   placeholder='Search a country (start with a)'
        //   options={pickerDataSources}
        //   components={components}
        //   value={single}
        //   onChange={handleChangeSingle}
        // />
      }
    </Grid>
  );
};
