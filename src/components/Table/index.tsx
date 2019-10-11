import React from 'react';
import clsx from 'clsx';
import { Table as MuiTable, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { OffsetPagination, TableColumn, FieldValueType } from '@app/core';
import { config } from '@app/config';
import { useStyles } from './styles';

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

interface Props {
  columns: TableColumn[];
  rows: { [id: string]: FieldValueType }[];
  pageIndex: number;
  itemsPerPage: number;
  count: number;
  onPaginationChange?: (pagination: OffsetPagination) => void;
  className: string;
  bodyMaxHeight?: string | number;
  bodyMinHeight?: string | number;
}

export const Table = (props: Props): JSX.Element => {
  const { columns, rows, className, bodyMaxHeight, bodyMinHeight, onPaginationChange, pageIndex, itemsPerPage } = props;
  const classes = useStyles();

  const handleChangePage = (_event: unknown, newPageIndex: number): void => {
    onPaginationChange &&
      onPaginationChange({
        type: 'OFFSET',
        pageIndex: newPageIndex,
        itemsPerPage,
      });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onPaginationChange &&
      onPaginationChange({
        type: 'OFFSET',
        pageIndex,
        itemsPerPage: +event.target.value,
      });
  };

  return (
    <div className={clsx(classes.root, className)}>
      <div
        className={classes.tableWrapper}
        style={{
          maxHeight: bodyMaxHeight || 53 * 6,
          minHeight: bodyMinHeight || 53 * 6, // shows minimum 5 columns
        }}
      >
        <MuiTable stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </div>
      <TablePagination
        rowsPerPageOptions={config.rowsPerPageOptions}
        component='div'
        count={rows.length}
        rowsPerPage={itemsPerPage}
        page={pageIndex}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};
