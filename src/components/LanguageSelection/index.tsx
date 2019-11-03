import React, { useState, useEffect } from 'react';
import { WithTranslation } from 'react-i18next';
import { i18n, withTranslation } from '@app/core';
import { config } from '@app/config';
import { useStyles } from './styles';
import { IconButton } from '../IconButton';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { Avatar } from '../Avatar';
import { Fab } from '../Fab';

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
    const currentLanguage = config.i18n.languages.find(
      (language) => window.location.pathname.indexOf(`/${language.code}`) === 0,
    );
    setLang(currentLanguage ? currentLanguage.code : config.i18n.defaultLang);
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
        {config.i18n.languages.map((language) => (
          <MenuItem key={language.code} onClick={changeLanguage(language.code)}>
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export const LanguageSelection = withTranslation('common')(BaseLanguageSelection);
