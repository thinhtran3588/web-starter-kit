import React from 'react';
import { TFunction } from 'next-i18next';
import { RawTable, TableRow, TableBody, TableCell, Typography, TableHead, FormField } from '@app/components';
import { PermissionTree, FieldValueType } from '@app/core';
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
  aggregateConfigs?: AggregateConfig[];
  setFieldValue: (field: string, value: FieldValueType) => void;
  data: PermissionTree;
  isBusy: boolean;
}

const baseActions = ['create', 'viewAny', 'viewOwn', 'updateAny', 'updateOwn', 'deleteAny', 'deleteOwn'];
const actionsWithFields = ['viewAny', 'viewOwn', 'updateAny', 'updateOwn'];

export const PermissionsTable = (props: Props): JSX.Element => {
  const { aggregateConfigs, t, setFieldValue, data, isBusy } = props;
  const classes = useStyles();
  const permissionTree: PermissionTree = JSON.parse(JSON.stringify(data));

  const updateActionPermission = (aggregateConfig: AggregateConfig, action: string): (() => void) => () => {
    if (permissionTree[aggregateConfig.name] && permissionTree[aggregateConfig.name][action]) {
      delete permissionTree[aggregateConfig.name][action];
    } else {
      if (!permissionTree[aggregateConfig.name]) {
        permissionTree[aggregateConfig.name] = {};
      }
      permissionTree[aggregateConfig.name][action] = {};
      if (action.indexOf('view') === 0) {
        aggregateConfig.viewFields.forEach((field) => {
          permissionTree[aggregateConfig.name][action][field] = 1;
        });
      } else if (action.indexOf('update') === 0) {
        aggregateConfig.updateFields.forEach((field) => {
          permissionTree[aggregateConfig.name][action][field] = 1;
        });
      }
    }
    setFieldValue('permissions', JSON.stringify(permissionTree));
  };

  const updateFieldPermission = (
    aggregateConfig: AggregateConfig,
    action: string,
    field: string,
  ): (() => void) => () => {
    if (
      permissionTree[aggregateConfig.name] &&
      permissionTree[aggregateConfig.name][action] &&
      permissionTree[aggregateConfig.name][action][field]
    ) {
      delete permissionTree[aggregateConfig.name][action][field];
      if (Object.keys(permissionTree[aggregateConfig.name][action]).length === 0) {
        delete permissionTree[aggregateConfig.name][action];
      }
    } else {
      if (!permissionTree[aggregateConfig.name]) {
        permissionTree[aggregateConfig.name] = {};
      }
      if (!permissionTree[aggregateConfig.name][action]) {
        permissionTree[aggregateConfig.name][action] = {};
      }
      permissionTree[aggregateConfig.name][action][field] = 1;
    }
    setFieldValue('permissions', JSON.stringify(permissionTree));
  };

  const renderAggregatePermissions = (aggregateConfig: AggregateConfig): JSX.Element => {
    let actions = baseActions.filter(
      (action) => !(aggregateConfig.excludedActions && aggregateConfig.excludedActions.includes(action)),
    );
    if (aggregateConfig.customActions) {
      actions = [...actions, ...(aggregateConfig.customActions || [])];
    }
    return (
      <React.Fragment key={aggregateConfig.name}>
        {actions.map((action, index) => (
          <TableRow key={action}>
            {index === 0 && <TableCell rowSpan={actions.length}>{aggregateConfig.name}</TableCell>}
            <TableCell>
              <FormField
                label={t(action)}
                value={!!permissionTree[aggregateConfig.name] && !!permissionTree[aggregateConfig.name][action]}
                onValueChange={updateActionPermission(aggregateConfig, action)}
                type='checkbox'
                disabled={isBusy}
              />
            </TableCell>
            <TableCell>
              {actionsWithFields.includes(action) &&
                (action.indexOf('view') === 0 ? aggregateConfig.viewFields : aggregateConfig.updateFields).map(
                  (field) => {
                    return (
                      <FormField
                        key={field}
                        label={field}
                        value={
                          !!permissionTree[aggregateConfig.name] &&
                          !!permissionTree[aggregateConfig.name][action] &&
                          !!permissionTree[aggregateConfig.name][action][field]
                        }
                        onValueChange={updateFieldPermission(aggregateConfig, action, field)}
                        type='checkbox'
                        className={classes.field}
                        disabled={isBusy}
                      />
                    );
                  },
                )}
            </TableCell>
          </TableRow>
        ))}
      </React.Fragment>
    );
  };
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
        <TableBody>{!!aggregateConfigs && aggregateConfigs.map(renderAggregatePermissions)}</TableBody>
      </RawTable>
    </div>
  );
};
