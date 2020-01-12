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
  /* --- variables & states - end --- */

  return (
    <AdminLayout title={t('users')} userMenuItems={userMenuItems}>
      <h1 className={classes.header}>AdminBlogs</h1>
    </AdminLayout>
  );
};

const ScreenBeforeTranslation = withAuth(Screen, (validatePermissions) => validatePermissions('blogs', 'viewAny'));

ScreenBeforeTranslation.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'admin_blogs'],
  };
};

export const AdminBlogsScreen = withTranslation('admin_blogs')(ScreenBeforeTranslation);
