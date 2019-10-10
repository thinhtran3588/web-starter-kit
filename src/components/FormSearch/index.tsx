import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import produce from 'immer';
import { Paper, useTheme, useMediaQuery } from '@material-ui/core';
import { Table } from '@app/components/Table';
import { FormFilter } from '@app/components/FormFilter';
import { OffsetPagination, FieldInfo, Filter, FieldValueType, TableColumn } from '@app/core';
import { config } from '@app/config';
import { useStyles } from './styles';

interface Props<T> {
  children?: React.ReactNode;
  defaultFilter?: Filter;
  filterFields?: FieldInfo[];
  onFilterChange?: (filter: Filter, pagination: OffsetPagination) => void;
  columns: TableColumn[];
  rows: { [id: string]: FieldValueType }[];
  count: number;
  classes?: { [className: string]: string };
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
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [pagination, setPagination] = useState<OffsetPagination>({
    type: 'OFFSET',
    pageIndex: 0,
    itemsPerPage: config.rowsPerPageOptions[0],
  });

  const handleChange = (fieldName: string) => (value: FieldValueType) =>
    setFilter(
      produce((draft: Filter) => {
        draft[fieldName] = value;
      }),
    );
  const handlePaginationChange = (newPagination: OffsetPagination): void =>
    setPagination(
      produce((draft: OffsetPagination) => {
        draft.pageIndex = newPagination.pageIndex;
        draft.itemsPerPage = newPagination.itemsPerPage;
      }),
    );
  useEffect(() => {
    onFilterChange && onFilterChange(filter, pagination);
  }, [filter, pagination]);

  return (
    <Paper className={classNames(classes.root, externalClasses.formSearchRoot)}>
      <FormFilter filterFields={filterFields} filter={filter} handleChange={handleChange} />
      <Table
        columns={columns}
        rows={rows}
        pageIndex={pagination.pageIndex}
        itemsPerPage={pagination.itemsPerPage}
        count={count}
        onPaginationChange={handlePaginationChange}
        className={classes.formTable}
        bodyMaxHeight={bodyMaxHeight}
      />
      {children}
    </Paper>
  );
};
