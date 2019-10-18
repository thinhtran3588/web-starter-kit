import React from 'react';
import Home from '@material-ui/icons/Home';
import MenuBook from '@material-ui/icons/MenuBook';
import Info from '@material-ui/icons/Info';
import Security from '@material-ui/icons/Security';
import Language from '@material-ui/icons/Language';
import Person from '@material-ui/icons/Person';
import Group from '@material-ui/icons/Group';
import Cancel from '@material-ui/icons/Cancel';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowRight from '@material-ui/icons/ArrowRight';
import Notifications from '@material-ui/icons/Notifications';
import Input from '@material-ui/icons/Input';
import Menu from '@material-ui/icons/Menu';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
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
    case 'Cancel':
      return <Cancel {...other} />;
    case 'ArrowDropDown':
      return <ArrowDropDown {...other} />;
    case 'ArrowRight':
      return <ArrowRight {...other} />;
    case 'Notifications':
      return <Notifications {...other} />;
    case 'Input':
      return <Input {...other} />;
    case 'Menu':
      return <Menu {...other} />;
    case 'Login':
      return <AssignmentIndIcon {...other} />;
    case 'Register':
      return <GroupAddIcon {...other} />;
    default:
      return <></>;
  }
};
