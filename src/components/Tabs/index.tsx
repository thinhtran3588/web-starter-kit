import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useImmer } from 'use-immer';
import MuiTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { Box } from '../Box';
import { Typography } from '../Typography';
import { useStyles } from './styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

interface Props {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
  label?: string;
}

function a11yProps(index: number): Record<string, string> {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export const Tabs = (props: Props): JSX.Element => {
  const { tabs, label } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useImmer(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number): void => {
    setValue(() => newValue);
  };

  const handleChangeIndex = (index: number): void => {
    setValue(() => index);
  };

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={classes.root}>
      <MuiTabs value={value} onChange={handleChange} aria-label={label} variant={!isDesktop ? 'fullWidth' : 'standard'}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} {...a11yProps(index)} />
        ))}
      </MuiTabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
};
