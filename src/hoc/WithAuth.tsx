/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import { useImmer } from 'use-immer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Loading, Typography } from '@app/components';
import {
  PermissionTree,
  GET_CURRENT_USER_QUERY,
  catchError,
  initApolloClient,
  AuthUser,
  cache,
  ValidatePermissions,
  UserMenuItem,
} from '@app/core';
import { navigationService } from '@app/services';
import { gql } from 'apollo-boost';

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
  isAdmin: boolean;
  isValid: boolean;
  permissions: PermissionTree;
  userMenuItems: UserMenuItem[];
}

const PERMISSIONS_KEY = 'PERMISSIONS_KEY';
const IS_ADMIN_KEY = 'IS_ADMIN_KEY';
const USER_MENU_ITEMS = 'ADMIN_USER_MENU_ITEMS';

export const withAuth = (PageComponent: any, validate?: (validatePermissions: ValidatePermissions) => boolean): any => {
  const WithAuth = (props: any): any => {
    const { t } = props;
    const classes = useStyles();
    const [authData, setAuthData] = useImmer<AuthData>({
      authUser: {
        id: '',
        loginType: 'EMAIL',
      },
      isAdmin: false,
      validating: true,
      isValid: false,
      permissions: {},
      userMenuItems: [],
    });

    const validateWithPermissions = (permissions: PermissionTree, isAdmin: boolean): ValidatePermissions => {
      return (aggregateName, action, field) =>
        isAdmin ||
        (!!permissions[aggregateName] &&
          !!permissions[aggregateName][action] &&
          (!field || !!permissions[aggregateName][action][field]));
    };

    const validatePermissions: ValidatePermissions = validateWithPermissions(authData.permissions, authData.isAdmin);

    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(
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

          let permissions: PermissionTree = cache.get(PERMISSIONS_KEY);
          let isAdmin: boolean = cache.get(IS_ADMIN_KEY);
          let userMenuItems: UserMenuItem[] = cache.get(USER_MENU_ITEMS);
          if (!permissions) {
            const { data: usersData, errors: usersErrors } = await initApolloClient().query({
              query: gql`
                query GetUserPermissionsAndMenuItems {
                  userPermissions(payload: {}) {
                    permissions
                    isAdmin
                  }
                  userMenuItems(payload: { type: ADMIN }) {
                    id
                    name
                    url
                    icon
                    children {
                      id
                      name
                      url
                      icon
                      children {
                        name
                        url
                        icon
                      }
                    }
                  }
                }
              `,
            });
            if (usersErrors || !usersData || !usersData.userPermissions) {
              navigationService.navigateTo({
                url: '/login',
              });
              return;
            }
            permissions = JSON.parse(usersData.userPermissions.permissions);
            isAdmin = usersData.userPermissions.isAdmin;
            userMenuItems = usersData.userMenuItems;
            cache.set(PERMISSIONS_KEY, permissions);
            cache.set(IS_ADMIN_KEY, isAdmin);
            cache.set(USER_MENU_ITEMS, userMenuItems);
          }
          setAuthData((draft) => {
            draft.authUser = data.currentUser;
            draft.isAdmin = isAdmin;
            draft.validating = false;
            draft.isValid = isAdmin || !validate || validate(validateWithPermissions(permissions, isAdmin));
            draft.permissions = permissions;
            draft.userMenuItems = userMenuItems;
          });
        }),
      );
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
    return (
      <PageComponent
        {...props}
        authUser={authData.authUser}
        validatePermissions={validatePermissions}
        userMenuItems={authData.userMenuItems}
      />
    );
  };
  return WithAuth;
};
