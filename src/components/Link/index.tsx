import React from 'react';
import { nextI18next } from '@app/core';
import clsx from 'clsx';
import { useStyles } from './styles';

const { Link: NextLink } = nextI18next;
interface Props {
  children?: React.ReactNode;
  href: string;
  title?: string;
  className?: string;
  showAsText?: boolean;
}

export const Link = (props: Props): JSX.Element => {
  const { children, href, className, showAsText, ...other } = props;
  const classes = useStyles();
  return (
    <NextLink href={href}>
      <a
        href={href}
        {...other}
        className={clsx(className, {
          [classes.showAsText]: showAsText,
        })}
      >
        {children}
      </a>
    </NextLink>
  );
};
