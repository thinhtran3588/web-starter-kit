import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
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
}

const baseActions = ['create', 'viewAny', 'viewOwn', 'updateAny', 'updateOwn', 'deleteAny', 'deleteOwn'];
const actionsWithFields = ['viewAny', 'viewOwn', 'updateAny', 'updateOwn'];

export const PermissionsTable = (props: Props): JSX.Element => {
  const { aggregateConfigs, t, setFieldValue } = props;
  const classes = useStyles();
  const [permissionTree, setPermissionTree] = useImmer<PermissionTree>({});

  const updateActionPermission = (aggregateConfig: AggregateConfig, action: string): (() => void) => () => {
    if (permissionTree[aggregateConfig.name] && permissionTree[aggregateConfig.name][action]) {
      setPermissionTree((draft: PermissionTree) => {
        delete draft[aggregateConfig.name][action];
      });
    } else {
      setPermissionTree((draft: PermissionTree) => {
        if (!draft[aggregateConfig.name]) {
          draft[aggregateConfig.name] = {};
        }
        draft[aggregateConfig.name][action] = {};
        if (action.indexOf('view') === 0) {
          aggregateConfig.viewFields.forEach((field) => {
            draft[aggregateConfig.name][action][field] = 1;
          });
        } else if (action.indexOf('update') === 0) {
          aggregateConfig.updateFields.forEach((field) => {
            draft[aggregateConfig.name][action][field] = 1;
          });
        }
      });
    }
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
      setPermissionTree((draft: PermissionTree) => {
        delete draft[aggregateConfig.name][action][field];
        if (Object.keys(draft[aggregateConfig.name][action]).length === 0) {
          delete draft[aggregateConfig.name][action];
        }
      });
    } else {
      setPermissionTree((draft: PermissionTree) => {
        if (!draft[aggregateConfig.name]) {
          draft[aggregateConfig.name] = {};
        }
        if (!draft[aggregateConfig.name][action]) {
          draft[aggregateConfig.name][action] = {};
        }
        draft[aggregateConfig.name][action][field] = 1;
      });
    }
  };
  useEffect(() => {
    setFieldValue('permissions', JSON.stringify(permissionTree));
  }, [permissionTree]);

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
      <Typography variant='caption'>{'permissions'}</Typography>
      <RawTable stickyHeader size='small'>
        <TableHead>
          <TableRow>
            <TableCell>{t('aggregate')}</TableCell>
            <TableCell>{t('permissions')}</TableCell>
            <TableCell>{t('fields')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{!!aggregateConfigs && aggregateConfigs.map(renderAggregatePermissions)}</TableBody>
      </RawTable>
    </div>
  );
};
