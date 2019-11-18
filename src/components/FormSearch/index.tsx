import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import produce from 'immer';
import { useTheme, useMediaQuery } from '@material-ui/core';
import {
  OffsetPagination,
  FieldInfo,
  FieldValueType,
  TableColumn,
  FilterWithOffsetPagination,
  CommandButton,
} from '@app/core';
import { config } from '@app/config';
import { Table } from '../Table';
import { FormFilter } from '../FormFilter';
import { Paper } from '../Paper';
import { useStyles } from './styles';
import { FormHeader } from '../FormHeader';

interface Props<T> {
  children?: React.ReactNode;
  defaultFilter?: T;
  filterFields: FieldInfo<T>[];
  onFilterChange?: (filter: FilterWithOffsetPagination, useDebounce: boolean) => void;
  columns: TableColumn[];
  rows: { [id: string]: FieldValueType }[];
  count: number;
  classes?: { [className: string]: string };
  title: string;
  commandButtons?: CommandButton[];
}

interface State {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter: any;
  useDebounce: boolean;
  pagination: {
    pageIndex: number;
    itemsPerPage: number;
  };
}

export const FormSearch: <T>(props: Props<T>) => JSX.Element = (props) => {
  const {
    children,
    defaultFilter = {},
    filterFields,
    onFilterChange,
    columns,
    rows,
    count,
    classes: externalClasses = {},
    title,
    commandButtons,
  } = props;
  const classes = useStyles();

  // handle layout change
  const [bodyMaxHeight, setBodyMaxHeight] = useState<string | number | undefined>('calc(100vh - 265px)');
  const theme = useTheme();
  const isSx = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  useEffect(() => {
    const fieldCount = filterFields ? filterFields.length : 0;
    let fieldPerRow = 4;
    if (isSx) {
      fieldPerRow = 1;
    }
    if (isSm) {
      fieldPerRow = 2;
    }
    if (isMd) {
      fieldPerRow = 3;
    }
    const rowCount = Math.ceil((1.0 * fieldCount) / fieldPerRow);
    const headerHeight = isSx ? 84 : 52;
    const reduceHeight = 148 + headerHeight + rowCount * 65;
    setBodyMaxHeight(`calc(100vh - ${reduceHeight}px)`);
  }, [isSx, isSm, isMd]);

  // handle filter, pagination change
  const [state, setState] = useState<State>({
    filter: defaultFilter || {},
    useDebounce: false,
    pagination: {
      pageIndex: 0,
      itemsPerPage: config.rowsPerPageOptions[0],
    },
  });

  const handleChange = (fieldName: string) => (value: FieldValueType, useDebounce: boolean) =>
    setState(
      produce((draft: State) => {
        draft.filter[fieldName] = value;
        draft.useDebounce = useDebounce === true;
      }),
    );
  const handlePaginationChange = (newPagination: OffsetPagination): void =>
    setState(
      produce((draft: State) => {
        draft.pagination.pageIndex = newPagination.pageIndex;
        draft.pagination.itemsPerPage = newPagination.itemsPerPage;
        draft.useDebounce = false;
      }),
    );
  useEffect(() => {
    onFilterChange &&
      onFilterChange(
        {
          ...state.filter,
          ...state.pagination,
        },
        state.useDebounce,
      );
  }, [state]);

  return (
    <Paper className={clsx(classes.root, externalClasses.formSearchRoot)}>
      <FormHeader title={title} commandButtons={commandButtons} />
      <FormFilter
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filterFields={filterFields as any}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filter={state.filter as any}
        handleChange={handleChange}
      />
      <Table
        columns={columns}
        rows={rows}
        pageIndex={state.pagination.pageIndex}
        itemsPerPage={state.pagination.itemsPerPage}
        count={count}
        onPaginationChange={handlePaginationChange}
        className={classes.formTable}
        bodyMaxHeight={bodyMaxHeight}
      />
      {children}
    </Paper>
  );
};
