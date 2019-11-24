import React from 'react';
import clsx from 'clsx';
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableHead as MuiTableHead,
  TablePagination as MuiTablePagination,
  TableRow as MuiTableRow,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { OffsetPagination, TableColumn, FieldValueType, RowCommand, withTranslation, WithTranslation } from '@app/core';
import { config } from '@app/config';
import { useStyles } from './styles';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

interface Props extends WithTranslation {
  commands?: RowCommand[];
  columns: TableColumn[];
  rows: { [id: string]: FieldValueType }[];
  pageIndex: number;
  itemsPerPage: number;
  count: number;
  onPaginationChange?: (pagination: OffsetPagination) => void;
  className: string;
  bodyMaxHeight?: string | number;
  bodyMinHeight?: string | number;
  size?: 'small' | 'medium';
  isBusy?: boolean;
}

export const TableBody = MuiTableBody;
export const TableCell = MuiTableCell;
export const TableHead = MuiTableHead;
export const TablePagination = MuiTablePagination;
export const TableRow = MuiTableRow;
export const RawTable = MuiTable;

export const BaseTable = (props: Props): JSX.Element => {
  const {
    columns,
    rows,
    className,
    bodyMaxHeight,
    bodyMinHeight,
    onPaginationChange,
    pageIndex,
    itemsPerPage,
    count,
    size,
    commands,
    isBusy,
    t,
  } = props;
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

  const renderCell = (row: { [id: string]: FieldValueType }, column: TableColumn): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = row;
    let key = '';
    if (!Array.isArray(column.field)) {
      key = column.field;
      value = row[column.field];
    } else {
      key = column.field.join('_');
      for (let i = 0; i < column.field.length; i += 1) {
        if (value[column.field[i]] !== undefined) {
          value = value[column.field[i]];
        }
      }
    }
    // eslint-disable-next-line no-null/no-null
    value = value === undefined || value === null ? '' : value;

    return (
      <TableCell key={key} align={column.align}>
        {!!column.customRender && column.customRender(row)}
        {!column.customRender && <>{column.format ? column.format(value) : value.toString()}</>}
      </TableCell>
    );
  };

  return (
    <div className={clsx(classes.root, className)}>
      <div
        className={classes.tableWrapper}
        style={{
          maxHeight: bodyMaxHeight,
          minHeight: bodyMinHeight, // shows minimum 5 columns
        }}
      >
        <MuiTable stickyHeader size={size}>
          <TableHead>
            <TableRow>
              {!!commands && (
                <TableCell
                  style={{
                    minWidth: commands.length * 50,
                  }}
                  className={classes.commandCell}
                />
              )}
              {columns.map((column) => (
                <TableCell
                  key={Array.isArray(column.field) ? column.field.join('_') : column.field}
                  align='center'
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
            {rows.map((row, index) => {
              return (
                <TableRow hover tabIndex={-1} key={index}>
                  {!!commands && (
                    <TableCell className={classes.commandCell}>
                      {commands.map((command) => (
                        <Tooltip key={command.title} title={command.title}>
                          <span className={classes.commandButton}>
                            <IconButton
                              color='primary'
                              style={
                                isBusy
                                  ? {}
                                  : {
                                      color: command.color === 'error' ? red.A400 : command.color,
                                    }
                              }
                              aria-label={command.title}
                              onClick={() => command.onClick(row)}
                              size='small'
                              disabled={command.disabled || isBusy}
                            >
                              <Icon name={command.icon} />
                            </IconButton>
                          </span>
                        </Tooltip>
                      ))}
                    </TableCell>
                  )}
                  {columns.map((column) => renderCell(row, column))}
                </TableRow>
              );
            })}
          </TableBody>
        </MuiTable>
      </div>
      <TablePagination
        rowsPerPageOptions={config.rowsPerPageOptions}
        component='div'
        count={count}
        rowsPerPage={itemsPerPage}
        page={pageIndex}
        backIconButtonProps={{
          'aria-label': t('common:previousPage'),
        }}
        nextIconButtonProps={{
          'aria-label': t('common:nextPage'),
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        // backIconButtonText={t('common:previousPage')}
        // nextIconButtonText={t('common:nextPage')}
        labelRowsPerPage={t('common:rowsPerPage')}
        labelDisplayedRows={({ from, to, count: rowCount }) =>
          t('common:displayedRows', {
            from,
            to: to === -1 ? rowCount : to,
            count: rowCount,
          })
        }
      />
    </div>
  );
};
export const Table = withTranslation('common')(BaseTable);
