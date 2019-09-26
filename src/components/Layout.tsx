import React from 'react';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props): JSX.Element => (
  <div>
    <Header />
    {children}
  </div>
);
