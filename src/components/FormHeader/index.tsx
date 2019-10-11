import React from 'react';
import { Button, Paper, Breadcrumbs, Typography, PropTypes } from '@material-ui/core';
import { Link } from '@app/components';
import { useStyles } from './styles';

interface Props {
  breadcrumbLinks?: BreadcrumbLink[];
  commandButtons?: CommandButton[];
}

interface CommandButton {
  text: string;
  color?: PropTypes.Color;
  onClick: (() => void) | (() => Promise<void>);
}

interface BreadcrumbLink {
  text: string;
  link?: string;
}

export const FormHeader = (props: Props): JSX.Element => {
  const { commandButtons, breadcrumbLinks, ...other } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.root} {...other}>
      <Breadcrumbs aria-label='breadcrumb' className={classes.breadcrumb}>
        {!!breadcrumbLinks &&
          breadcrumbLinks.map((breadcrumbLink) =>
            breadcrumbLink.link ? (
              <Link key={breadcrumbLink.text} href={breadcrumbLink.link}>
                {breadcrumbLink.text}
              </Link>
            ) : (
              <Typography key={breadcrumbLink.text} color='textPrimary'>
                {breadcrumbLink.text}
              </Typography>
            ),
          )}
      </Breadcrumbs>
      <div className={classes.commands}>
        {!!commandButtons &&
          commandButtons.map((commandButton) => (
            <Button
              key={commandButton.text}
              variant='contained'
              color={commandButton.color}
              className={classes.button}
              onClick={commandButton.onClick}
            >
              {commandButton.text}
            </Button>
          ))}
      </div>
    </Paper>
  );
};
