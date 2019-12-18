import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useImmer } from 'use-immer';
import { useTheme, useMediaQuery } from '@material-ui/core';
import {
  OffsetPagination,
  FieldInfo,
  FieldValueType,
  TableColumn,
  FilterWithOffsetPagination,
  RowCommand,
  OrderBy,
} from '@app/core';
import { config } from '@app/config';
import { Table } from '../Table';
import { FormFilter } from '../FormFilter';
import { Paper } from '../Paper';
import { useStyles } from './styles';
import { FormHeader } from '../FormHeader';
import { ButtonProps } from '../Button';

interface Props<T> {
  children?: React.ReactNode;
  defaultFilter?: T;
  filterFields: FieldInfo<T>[];
  onFilterChange?: (filter: FilterWithOffsetPagination, useDebounce: boolean) => void;
  rowCommands?: (RowCommand | false)[];
  columns: (TableColumn | false)[];
  rows: { [id: string]: FieldValueType }[];
  count: number;
  classes?: { [className: string]: string };
  title: string;
  commandButtons?: (ButtonProps | false)[];
  size?: 'small' | 'medium';
  isBusy?: boolean;
  sortable?: boolean;
  orderBy?: OrderBy;
}

interface State {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter: any;
  useDebounce: boolean;
  pagination: {
    pageIndex: number;
    itemsPerPage: number;
  };
  orderBy: OrderBy;
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
    size,
    rowCommands,
    isBusy,
    sortable,
    orderBy,
  } = props;
  const classes = useStyles();

  // handle layout change
  const [bodyMaxHeight, setBodyMaxHeight] = useImmer<string | number | undefined>('calc(100vh - 265px)');
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
    setBodyMaxHeight(() => `calc(100vh - ${reduceHeight}px)`);
  }, [isSx, isSm, isMd]);

  // handle filter, pagination change
  const tableColumns = columns
    .filter((column) => column && column.sortable !== false)
    .map((column) => column as TableColumn);
  const [state, setState] = useImmer<State>({
    filter: defaultFilter || {},
    useDebounce: false,
    pagination: {
      pageIndex: 0,
      itemsPerPage: config.rowsPerPageOptions[0],
    },
    orderBy: orderBy || {
      field: tableColumns.length > 0 ? tableColumns[0].field : '',
      direction: 'asc',
    },
  });

  const handleChange = (fieldName: string) => (value: FieldValueType, useDebounce: boolean) =>
    setState((draft: State) => {
      draft.filter[fieldName] = value;
      draft.useDebounce = useDebounce === true;
    });
  const handlePaginationChange = (newPagination: OffsetPagination): void =>
    setState((draft: State) => {
      draft.pagination.pageIndex = newPagination.pageIndex;
      draft.pagination.itemsPerPage = newPagination.itemsPerPage;
      draft.useDebounce = false;
    });
  const handleOrderByChange = (newOrder: OrderBy): void => {
    setState((draft: State) => {
      draft.orderBy = newOrder;
    });
  };
  useEffect(() => {
    onFilterChange &&
      onFilterChange(
        {
          ...state.filter,
          ...state.pagination,
          orderBy: `${state.orderBy.field}_${state.orderBy.direction}`,
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
        commands={rowCommands}
        columns={columns}
        rows={rows}
        pageIndex={state.pagination.pageIndex}
        itemsPerPage={state.pagination.itemsPerPage}
        count={count}
        onPaginationChange={handlePaginationChange}
        className={classes.formTable}
        bodyMaxHeight={bodyMaxHeight}
        size={size || 'small'}
        isBusy={isBusy}
        orderBy={state.orderBy}
        onOrderByChange={handleOrderByChange}
        sortable={sortable}
      />
      {children}
    </Paper>
  );
};
