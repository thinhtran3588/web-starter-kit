import React from 'react';
import clsx from 'clsx';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import { Typography } from '@material-ui/core';
import { NavItem } from '@app/core';
import { Icon, Link } from '@app/components';
import { useStyles } from './styles';

interface Props {
  navItems: NavItem[];
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon?: string;
  labelInfo?: string;
  labelText: string;
  link?: string;
};

const StyledTreeItem = (props: StyledTreeItemProps): JSX.Element => {
  const { link, labelText, labelIcon, color, bgColor, ...other } = props;
  const classes = useStyles();
  const Item = (
    <div
      className={classes.labelRoot}
      style={{
        color,
      }}
    >
      <span className={classes.labelIconContainer}>
        {!!labelIcon && <Icon name={labelIcon} color='inherit' className={classes.labelIcon} />}
      </span>
      <Typography variant='body2' className={classes.labelText}>
        {labelText}
      </Typography>
    </div>
  );

  return (
    <TreeItem
      label={
        link ? (
          <Link href={link} className={clsx(classes.link, classes.labelRoot)} title={labelText}>
            {Item}
          </Link>
        ) : (
          Item
        )
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.rootItem,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
};

const renderMenuItems = (navItems: NavItem[]): JSX.Element => {
  return (
    <>
      {navItems.map((navItem) => (
        <StyledTreeItem
          key={navItem.id}
          nodeId={navItem.id}
          labelText={navItem.text}
          labelIcon={navItem.icon}
          color={navItem.color || '#1a73e8'}
          bgColor={navItem.bgColor || '#e8f0fe'}
          link={navItem.link}
        >
          {navItem.children && renderMenuItems(navItem.children)}
        </StyledTreeItem>
      ))}
    </>
  );
};

export const SidebarMenu = (props: Props): JSX.Element => {
  const { navItems } = props;
  const classes = useStyles();
  const defaultExpanded = navItems.filter((m) => m.expanded).map((m) => m.id);
  return (
    <TreeView
      className={classes.root}
      defaultExpanded={defaultExpanded}
      defaultCollapseIcon={<Icon name='ArrowDropDown' />}
      defaultExpandIcon={<Icon name='ArrowRight' />}
      defaultEndIcon={<div className={classes.defaultEndIcon} />}
    >
      {renderMenuItems(navItems)}
    </TreeView>
  );
};
