import React from 'react';
import { withTranslation, WithTranslation } from '@app/core';
import { config } from '@app/config';
import { Typography } from '../Typography';
import { Link } from '../Link';
import { useStyles } from './styles';

type Props = WithTranslation;

export const BaseAdminFooter = (props: Props): JSX.Element => {
  const { t } = props;
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant='body1'>
        &copy; <Link href='/'>{config.author}</Link>
        &nbsp;{config.copyRightYear}
      </Typography>
      <Typography variant='caption'>{t('createdWithLove')}</Typography>
    </footer>
  );
};

export const AdminFooter = withTranslation('admin_common')(BaseAdminFooter);
