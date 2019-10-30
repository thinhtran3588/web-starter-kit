import React, { useState, useEffect } from 'react';
import { WithTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem, Avatar, Fab } from '@material-ui/core';
import { i18n, withTranslation } from '@app/core';
import { config } from '@app/config';
import { useStyles } from './styles';

interface Props extends WithTranslation {
  useFab?: boolean;
  className?: string;
}
export const BaseLanguageSelection = (props: Props): JSX.Element => {
  const { useFab, className, t } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<undefined | HTMLElement>(undefined);
  const [lang, setLang] = useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(undefined);
  };

  const changeLanguage = (newLang: string) => () => {
    setAnchorEl(undefined);
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  useEffect(() => {
    const currentLanguage = config.languages.find(
      (language) => window.location.pathname.indexOf(`/${language.code}`) === 0,
    );
    setLang(currentLanguage ? currentLanguage.code : config.defaultLanguage);
  });

  return (
    <div className={className}>
      {useFab && (
        <Fab color='primary' aria-label={t('changeLanguage')} onClick={handleClick}>
          <Avatar className={classes.icon}>{lang.toLocaleUpperCase()}</Avatar>
        </Fab>
      )}
      {!useFab && (
        <IconButton color='primary' aria-label={t('changeLanguage')} onClick={handleClick}>
          <Avatar className={classes.icon}>{lang.toLocaleUpperCase()}</Avatar>
        </IconButton>
      )}
      <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {config.languages.map((language) => (
          <MenuItem key={language.code} onClick={changeLanguage(language.code)}>
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export const LanguageSelection = withTranslation('common')(BaseLanguageSelection);
