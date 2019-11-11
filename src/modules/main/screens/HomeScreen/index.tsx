import React from 'react';
import { Layout } from '@app/components';
import { WithTranslation, withTranslation } from '@app/core';
import { CoverImage, Features, Quote, Help } from './components';

type Props = WithTranslation;

const Screen = (props: Props): JSX.Element => {
  const { t } = props;
  return (
    <Layout title={t('home')} description={t('description')}>
      <CoverImage t={t} />
      <Features t={t} />
      <Quote t={t} />
      <Help t={t} />
    </Layout>
  );
};

Screen.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'home'],
  };
};

export const HomeScreen = withTranslation('home')(Screen);
