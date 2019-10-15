import React from 'react';
import { nextI18next } from '@app/core';

const { Link: NextLink } = nextI18next;
interface Props {
  children?: React.ReactNode;
  href: string;
  title?: string;
  className?: string;
}
export const Link = (props: Props): JSX.Element => {
  const { children, href, ...other } = props;
  return (
    <NextLink href={href}>
      <a href={href} {...other}>
        {children}
      </a>
    </NextLink>
  );
};
