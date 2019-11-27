import React from 'react';
import { useImmer } from 'use-immer';
import MuiTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
  const [value, setValue] = useImmer(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number): void => {
    setValue(() => newValue);
  };

  return (
    <div className={classes.root}>
      <MuiTabs value={value} onChange={handleChange} aria-label={label}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} {...a11yProps(index)} />
        ))}
      </MuiTabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </div>
  );
};
