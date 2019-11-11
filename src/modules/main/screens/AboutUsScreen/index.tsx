import React from 'react';
import { WithTranslation, withTranslation } from '@app/core';
import { Layout } from '@app/components';
import { useStyles } from './styles';

type Props = WithTranslation;

export const Screen = (props: Props): JSX.Element => {
  const { t } = props;
  const classes = useStyles();
  return (
    <Layout title={t('aboutUs')}>
      <h1 className={classes.header}>{t('aboutUs')}</h1>
    </Layout>
  );
};

Screen.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'about_us'],
  };
};

export const AboutUsScreen = withTranslation('about_us')(Screen);
