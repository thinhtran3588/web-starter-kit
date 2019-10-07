import React from 'react';
import Home from '@material-ui/icons/Home';
import MenuBook from '@material-ui/icons/MenuBook';
import Info from '@material-ui/icons/Info';
import Security from '@material-ui/icons/Security';
import Language from '@material-ui/icons/Language';
import Person from '@material-ui/icons/Person';
import Group from '@material-ui/icons/Group';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

interface Props extends SvgIconProps {
  name: string;
}

export const Icon = (props: Props): JSX.Element => {
  const { name, ...other } = props;
  switch (name) {
    case 'Home':
      return <Home {...other} />;
    case 'MenuBook':
      return <MenuBook {...other} />;
    case 'Info':
      return <Info {...other} />;
    case 'Security':
      return <Security {...other} />;
    case 'Language':
      return <Language {...other} />;
    case 'Person':
      return <Person {...other} />;
    case 'Group':
      return <Group {...other} />;
    default:
      return <></>;
  }
};
