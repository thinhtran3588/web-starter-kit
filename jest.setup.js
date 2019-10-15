/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

jest.mock('next-i18next', () => {
  return function constructor() {
    return {
      withTranslation: (namespace) => (Component) => {
        const t = (key) => `${namespace}.${key}`;
        const WithTranslationComponent = (props) => <Component t={t} {...props} />;
        return WithTranslationComponent;
      },
      Link: 'next-link',
    };
  };
});
