/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Loading, Typography } from '@app/components';
import makeStyles from '@material-ui/core/styles/makeStyles';
import firebase from 'firebase/app';
import { getPermissionTree, PermissionTree } from '@app/core';
import { navigationService } from '@app/services';

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
}));

interface AuthStatus {
  validating: boolean;
  isValid: boolean;
}

export const withAuth = (PageComponent: any, validate?: (permissionsTree: PermissionTree) => boolean): any => {
  const WithAuth = (props: any): any => {
    const { t } = props;
    const classes = useStyles();
    const [status, setStatus] = useState<AuthStatus>({
      validating: true,
      isValid: false,
    });
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(async (authUser) => {
        if (!authUser) {
          navigationService.navigateTo({
            url: '/login',
          });
          return;
        }
        const permissionsTree = await getPermissionTree();
        setStatus({
          validating: false,
          isValid: !validate || validate(permissionsTree),
        });
      });
      return () => {
        unsubscribe();
      };
    }, []);
    if (status.validating) {
      return (
        <div className={classes.container}>
          <Loading />
        </div>
      );
    }
    if (!status.isValid) {
      return (
        <div className={classes.container}>
          <Typography variant='h6' component='p'>
            {t('common:forbidden')}
          </Typography>
        </div>
      );
    }
    return <PageComponent {...props} />;
  };
  return WithAuth;
};
