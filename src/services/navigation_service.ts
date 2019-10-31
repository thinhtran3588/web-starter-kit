import Router from 'next/router';

const navigateTo = ({ url, as, options }: { url: string; as?: string; options?: {} }): void => {
  Router.push(url, as, options);
};

const goBack = (): void => Router.back();

export const navigationService = {
  navigateTo,
  goBack,
};
