import React from 'react';
import { AdminLayout } from '@app/components';
import { WithTranslation, AuthProps, withTranslation } from '@app/core';
import { withAuth } from '@app/hoc/WithAuth';
import { useStyles } from './styles';

type Props = WithTranslation & AuthProps;

export const Screen = (props: Props): JSX.Element => {
  /* --- variables & states - begin --- */
  const { t, userMenuItems } = props;
  const classes = useStyles();
  return (
    <AdminLayout title={t('dashboard')} userMenuItems={userMenuItems}>
      <h1 className={classes.header}>Dashboard</h1>
    </AdminLayout>
  );
};
/* --- variables & states - end --- */

const ScreenBeforeTranslation = withAuth(Screen, (validatePermissions) => validatePermissions('dashboard', 'viewAny'));

ScreenBeforeTranslation.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'admin_dashboard'],
  };
};

export const DashboardScreen = withTranslation('admin_dashboard')(ScreenBeforeTranslation);
