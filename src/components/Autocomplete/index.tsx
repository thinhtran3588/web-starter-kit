import React, { CSSProperties, HTMLAttributes } from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import { useTheme } from '@material-ui/core';
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import { ValueType } from 'react-select/src/types';
import { Omit } from '@material-ui/types';
import { PickerDataItem, FieldValueType } from '@app/core';
import { Chip } from '../Chip';
import { Paper } from '../Paper';
import { MenuItem } from '../MenuItem';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { BaseTextFieldProps, TextField } from '../TextField';
import { useStyles } from './styles';

interface OptionType {
  label: string;
  value: string;
}

const NoOptionsMessage = (props: NoticeProps<OptionType>): JSX.Element => {
  return (
    <Typography color='textSecondary' className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
      {props.children}
    </Typography>
  );
};

type InputComponentProps = Pick<BaseTextFieldProps, 'inputRef'> & HTMLAttributes<HTMLDivElement>;

const inputComponent = ({ inputRef, ...props }: InputComponentProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <div ref={inputRef} {...(props as any)} />;
};

const Control = (props: ControlProps<OptionType>): JSX.Element => {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
};

const Option = (props: OptionProps<OptionType>): JSX.Element => {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component='div'
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
};
type MuiPlaceholderProps = Omit<PlaceholderProps<OptionType>, 'innerProps'> &
  Partial<Pick<PlaceholderProps<OptionType>, 'innerProps'>>; // eslint-disable-line @typescript-eslint/indent
const Placeholder = (props: MuiPlaceholderProps): JSX.Element => {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography color='textSecondary' className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
};

const SingleValue = (props: SingleValueProps<OptionType>): JSX.Element => {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
};

const ValueContainer = (props: ValueContainerProps<OptionType>): JSX.Element => {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
};

const MultiValue = (props: MultiValueProps<OptionType>): JSX.Element => {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<Icon name='Cancel' {...props.removeProps} />}
    />
  );
};

const Menu = (props: MenuProps<OptionType>): JSX.Element => {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

interface Props<T extends FieldValueType> {
  id?: string;
  label: string;
  value: T;
  pickerDataSources?: PickerDataItem<T>[];
  error?: boolean;
  disabled?: boolean;
  onChange?: (value: T) => void;
}

const Autocomplete: <T extends FieldValueType>(props: Props<T>) => JSX.Element = (props) => {
  const { id, label, value, onChange, pickerDataSources, error, disabled } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let inputValue: ValueType<OptionType>;
  let options: OptionType[] = [];
  if (pickerDataSources) {
    options = pickerDataSources.map((m) => ({
      value: m.value ? m.value.toString() : '',
      label: m.label,
    }));
    inputValue = options.find((m) => (value ? value.toString() : '') === m.value);
  }
  const classes = useStyles();
  const theme = useTheme();

  const handleChangeSingle = (newValue: ValueType<OptionType>): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let chosenValue: FieldValueType;
    if (newValue && pickerDataSources) {
      if (!Array.isArray(newValue)) {
        const chosenItem = pickerDataSources.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (m) => (m.value ? m.value.toString() : undefined) === (newValue as any).value,
        );
        chosenValue = chosenItem ? chosenItem.value : undefined;
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange && onChange(chosenValue as any);
  };

  const selectStyles = {
    input: (base: CSSProperties) => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <div className={classes.root}>
      <Select
        classes={classes}
        styles={selectStyles}
        inputId={id}
        TextFieldProps={{
          label,
          InputLabelProps: {
            htmlFor: id,
            shrink: true,
          },
        }}
        placeholder=''
        options={options}
        components={components}
        value={inputValue}
        onChange={handleChangeSingle}
        error={error}
        isDisabled={disabled}
      />
    </div>
  );
};

export default Autocomplete;
