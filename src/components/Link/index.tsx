import React from 'react';
import NextLink from 'next/link';

interface Props {
  href: string;
  className?: string;
  children?: React.ReactNode;
}
export const Link = (props: Props): JSX.Element => {
  const { href, children, ...other } = props;
  return (
    <NextLink href={href}>
      <a href={href} {...other}>
        {children}
      </a>
    </NextLink>
  );
};
