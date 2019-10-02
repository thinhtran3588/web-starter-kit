import React from 'react';
import Link from 'next/link';
import { useStyles } from './styles';

export const Header = (): JSX.Element => {
  const styles = useStyles();
  return (
    <div>
      <Link href='/'>
        <a className={styles.link}>Home</a>
      </Link>
      <Link href='/about'>
        <a className={styles.link}>About</a>
      </Link>
    </div>
  );
};
