import React from 'react';
import { Link } from '@material-ui/core';
import { withTranslation } from '@app/core';
import { WithTranslation } from 'react-i18next';
import { useStyles } from './styles';

interface Props extends WithTranslation {
  children?: JSX.Element;
  pageName: string;
}

const BaseAuthLayout = (props: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <div className={classes.logoText}>
          <span>Mindx Tech</span>
        </div>

        {props.children}

        <div className={classes.links}>
          <div className={classes.wrapper}>
            <Link color='inherit' href='/' className={classes.forgot}>
              {props.t('home')}
            </Link>
            <Link color='inherit' className={classes.forgot}>
              {props.t('forgotPassword')}
            </Link>
            {props.pageName === 'login' && <Link href='/register'>{props.t('createAnAccount')}</Link>}
            {props.pageName === 'register' && <Link href='/login'>{props.t('alreadyHaveAccount')}</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuthLayout = withTranslation('auth_layout')(BaseAuthLayout);
