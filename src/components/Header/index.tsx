import React from 'react';
import Link from 'next/link';

export const Header = (): JSX.Element => (
  <div>
    <Link href='/'>
      <a>Home</a>
    </Link>
    <Link href='/about'>
      <a>About</a>
    </Link>
    <style jsx>
      {`
        a {
          margin: 5px;
          padding: 5px;
          border: '1px solid #DDD';
          font-weight: bold;
        }
      `}
    </style>
  </div>
);
