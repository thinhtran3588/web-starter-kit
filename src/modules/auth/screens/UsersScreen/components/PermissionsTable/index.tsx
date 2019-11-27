import React, { memo } from 'react';
import { RawTable, TableRow, TableBody, TableCell, Typography, TableHead, FormField } from '@app/components';
import { PermissionTree, TFunction } from '@app/core';
import { useStyles } from './styles';

export interface AggregateConfig {
  name: string;
  viewFields: string[];
  updateFields: string[];
  customActions?: string[];
  excludedActions?: string[];
}

interface Props {
  t: TFunction;
  data: string;
}

const BasePermissionsTable = (props: Props): JSX.Element => {
  /* --- variables & states - begin --- */
  const { t, data } = props;
  const classes = useStyles();
  const permissionTree: PermissionTree = JSON.parse(data);
  /* --- variables & states - end --- */

  return (
    <div>
      <Typography variant='subtitle1'>{t('permissions')}</Typography>
      <RawTable stickyHeader size='small'>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>{t('aggregate')}</TableCell>
            <TableCell className={classes.tableHeader}>{t('permissions')}</TableCell>
            <TableCell className={classes.tableHeader}>{t('fields')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(permissionTree).map((aggKey) => {
            const actions = Object.keys(permissionTree[aggKey]);
            return (
              <React.Fragment key={aggKey}>
                {actions.map((action, index) => (
                  <TableRow key={action}>
                    {index === 0 && <TableCell rowSpan={actions.length}>{aggKey}</TableCell>}
                    <TableCell>
                      <FormField label={t(action)} value={true} type='checkbox' disabled={true} />
                    </TableCell>
                    <TableCell>
                      {Object.keys(permissionTree[aggKey][action]).map((field) => (
                        <FormField
                          key={field}
                          label={field}
                          value={true}
                          type='checkbox'
                          className={classes.field}
                          disabled={true}
                        />
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            );
          })}
        </TableBody>
      </RawTable>
    </div>
  );
};

export const PermissionsTable = memo(BasePermissionsTable, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data;
});
