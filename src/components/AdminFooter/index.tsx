import React from 'react';
import { Link } from '@app/components';
import { Typography } from '@material-ui/core';
import { withTranslation } from '@app/core';
import { WithTranslation } from 'react-i18next';
import { config } from '@app/config';
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
