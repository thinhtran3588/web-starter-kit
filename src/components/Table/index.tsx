import React from 'react';
import clsx from 'clsx';
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableHead as MuiTableHead,
  TablePagination as MuiTablePagination,
  TableRow as MuiTableRow,
  TableSortLabel as MuiTableSortLabel,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import {
  OffsetPagination,
  TableColumn,
  FieldValueType,
  RowCommand,
  withTranslation,
  WithTranslation,
  OrderBy,
} from '@app/core';
import { config } from '@app/config';
import { useStyles } from './styles';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

interface Props extends WithTranslation {
  commands?: (RowCommand | false)[];
  columns: (TableColumn | false)[];
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
  orderBy: OrderBy;
  onOrderByChange?: (orderBy: OrderBy) => void;
  sortable?: boolean;
}

export const TableBody = MuiTableBody;
export const TableCell = MuiTableCell;
export const TableHead = MuiTableHead;
export const TablePagination = MuiTablePagination;
export const TableRow = MuiTableRow;
export const TableSortLabel = MuiTableSortLabel;
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
    orderBy,
    onOrderByChange,
    sortable,
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
    const properties = column.field.split('.');
    if (properties.length === 1) {
      value = row[properties[0]];
    } else {
      for (let i = 0; i < properties.length; i += 1) {
        if (value[properties[i]] !== undefined) {
          value = value[properties[i]];
        }
      }
    }
    // eslint-disable-next-line no-null/no-null
    value = value === undefined || value === null ? '' : value;

    return (
      <TableCell key={column.field} align={column.align}>
        {!!column.customRender && column.customRender(row)}
        {!column.customRender && <>{column.format ? column.format(value) : value.toString()}</>}
      </TableCell>
    );
  };

  const rowCommands = commands ? commands.filter((command) => !!command).map((command) => command as RowCommand) : [];
  const createSortHandler = (field: string) => (_event: React.MouseEvent<unknown>) => {
    onOrderByChange &&
      onOrderByChange({
        field,
        direction: orderBy.field === field && orderBy.direction === 'asc' ? 'desc' : 'asc',
      });
  };

  return (
    <div className={clsx(classes.root, className)}>
      <div
        className={classes.tableWrapper}
        style={{
          maxHeight: bodyMaxHeight,
          minHeight: bodyMinHeight,
        }}
      >
        <MuiTable stickyHeader size={size}>
          <TableHead>
            <TableRow>
              {!!rowCommands && rowCommands.length > 0 && (
                <TableCell
                  style={{
                    minWidth: rowCommands.length * 50,
                  }}
                  className={classes.commandCell}
                />
              )}
              {columns.map((column) => {
                return (
                  column && (
                    <TableCell
                      key={Array.isArray(column.field) ? column.field.join('_') : column.field}
                      align='center'
                      style={{
                        minWidth: column.minWidth,
                      }}
                      sortDirection={orderBy.field === column.field ? orderBy.direction : false}
                    >
                      {sortable && column.sortable !== false ? (
                        <TableSortLabel
                          active={orderBy.field === column.field}
                          direction={orderBy.direction}
                          onClick={createSortHandler(column.field)}
                        >
                          {column.label}
                          {orderBy.field === column.field ? (
                            <span className={classes.visuallyHidden}>
                              {orderBy.direction === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                          ) : (
                            <></>
                          )}
                        </TableSortLabel>
                      ) : (
                        <>{column.label}</>
                      )}
                    </TableCell>
                  )
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover tabIndex={-1} key={index}>
                  {!!rowCommands && rowCommands.length > 0 && (
                    <TableCell className={classes.commandCell}>
                      {rowCommands
                        .filter((command) => !command.hidden || !command.hidden(row))
                        .map((command) => command as RowCommand)
                        .map((command) => (
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
                  {columns.map((column) => column && renderCell(row, column))}
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
