/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import { useImmer } from 'use-immer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Loading, Typography } from '@app/components';
import { PermissionTree, GET_CURRENT_USER_QUERY, catchError, initApolloClient, AuthUser } from '@app/core';
import { navigationService } from '@app/services';

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
}));

interface AuthData {
  authUser: AuthUser;
  validating: boolean;
  isValid: boolean;
}

export const withAuth = (PageComponent: any, validate?: (permissionsTree: PermissionTree) => boolean): any => {
  const WithAuth = (props: any): any => {
    const { t } = props;
    const classes = useStyles();
    const [authData, setAuthData] = useImmer<AuthData>({
      authUser: {
        id: '',
        loginType: 'EMAIL',
      },
      validating: true,
      isValid: false,
    });
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(async () => {
        catchError(async () => {
          const { data, errors } = await initApolloClient().query({
            query: GET_CURRENT_USER_QUERY,
          });
          if (errors || !data || !data.currentUser || !data.currentUser.id) {
            navigationService.navigateTo({
              url: '/login',
            });
            return;
          }
          // const permissionsTree = await getPermissionTree();
          setAuthData(() => ({
            authUser: data.currentUser,
            validating: false,
            isValid: !validate, // || validate(permissionsTree),
          }));
        })();
      });
      return () => {
        unsubscribe();
      };
    }, []);
    if (authData.validating) {
      return (
        <div className={classes.container}>
          <Loading />
        </div>
      );
    }
    if (!authData.isValid) {
      return (
        <div className={classes.container}>
          <Typography variant='h6' component='p'>
            {t('common:forbidden')}
          </Typography>
        </div>
      );
    }
    return <PageComponent {...props} authUser={authData.authUser} />;
  };
  return WithAuth;
};
