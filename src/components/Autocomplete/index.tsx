import React, { CSSProperties, HTMLAttributes } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import { ValueType } from 'react-select/src/types';
import { Omit } from '@material-ui/types';
import { useTheme } from '@material-ui/core';
import { useStyles } from './styles';

interface OptionType {
  label: string;
  value: string;
}

const suggestions: OptionType[] = [
  {
    label: 'Afghanistan',
  },
  {
    label: 'Aland Islands',
  },
  {
    label: 'Albania',
  },
  {
    label: 'Algeria',
  },
  {
    label: 'American Samoa',
  },
  {
    label: 'Andorra',
  },
  {
    label: 'Angola',
  },
  {
    label: 'Anguilla',
  },
  {
    label: 'Antarctica',
  },
  {
    label: 'Antigua and Barbuda',
  },
  {
    label: 'Argentina',
  },
  {
    label: 'Armenia',
  },
  {
    label: 'Aruba',
  },
  {
    label: 'Australia',
  },
  {
    label: 'Austria',
  },
  {
    label: 'Azerbaijan',
  },
  {
    label: 'Bahamas',
  },
  {
    label: 'Bahrain',
  },
  {
    label: 'Bangladesh',
  },
  {
    label: 'Barbados',
  },
  {
    label: 'Belarus',
  },
  {
    label: 'Belgium',
  },
  {
    label: 'Belize',
  },
  {
    label: 'Benin',
  },
  {
    label: 'Bermuda',
  },
  {
    label: 'Bhutan',
  },
  {
    label: 'Bolivia, Plurinational State of',
  },
  {
    label: 'Bonaire, Sint Eustatius and Saba',
  },
  {
    label: 'Bosnia and Herzegovina',
  },
  {
    label: 'Botswana',
  },
  {
    label: 'Bouvet Island',
  },
  {
    label: 'Brazil',
  },
  {
    label: 'British Indian Ocean Territory',
  },
  {
    label: 'Brunei Darussalam',
  },
].map((suggestion) => ({
  value: suggestion.label,
  label: suggestion.label,
}));

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
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
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

export const Autocomplete = (): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const [single, setSingle] = React.useState<ValueType<OptionType>>(undefined);
  const [multi, setMulti] = React.useState<ValueType<OptionType>>(undefined);

  const handleChangeSingle = (value: ValueType<OptionType>): void => {
    setSingle(value);
  };

  const handleChangeMulti = (value: ValueType<OptionType>): void => {
    setMulti(value);
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
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          inputId='react-select-single'
          TextFieldProps={{
            label: 'Country',
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true,
            },
          }}
          placeholder='Search a country (start with a)'
          options={suggestions}
          components={components}
          value={single}
          onChange={handleChangeSingle}
        />
        <div className={classes.divider} />
        <Select
          classes={classes}
          styles={selectStyles}
          inputId='react-select-multiple'
          TextFieldProps={{
            label: 'Countries',
            InputLabelProps: {
              htmlFor: 'react-select-multiple',
              shrink: true,
            },
          }}
          placeholder='Select multiple countries'
          options={suggestions}
          components={components}
          value={multi}
          onChange={handleChangeMulti}
          isMulti
        />
      </NoSsr>
    </div>
  );
};
