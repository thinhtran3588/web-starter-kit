import React, { useState } from 'react';
import { WithTranslation } from 'react-i18next';
import { TextField, FormControl, FormHelperText, Button, Grid } from '@material-ui/core';
import * as yup from 'yup';
import { Formik, FormikContext } from 'formik';
import clsx from 'clsx';
import { AuthLayout, Link, LanguageSelection } from '@app/components';
import { withTranslation, handleError, LoginType } from '@app/core';
import { config } from '@app/config';
import { navigationService, authService } from '@app/services';
import { useStyles } from './styles';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { mapStateToProps } from './map_state_to_props';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & WithTranslation;

interface LoginInput {
  email: string;
  password: string;
}

const initialValues: LoginInput = {
  email: '',
  password: '',
};

const BaseScreen = (props: Props): JSX.Element => {
  const { t, login } = props;
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const classes = useStyles();
  const validationSchema = yup.object().shape<LoginInput>({
    email: yup
      .string()
      .required(
        t('common:requiredError', {
          field: t('email'),
        }),
      )
      .matches(
        config.regex.email,
        t('common:invalidError', {
          field: t('email'),
        }),
      ),
    password: yup
      .string()
      .required(
        t('common:requiredError', {
          field: t('password'),
        }),
      )
      .matches(config.regex.password, t('invalidPassword')),
  });

  const onSubmit = async (input: LoginInput): Promise<void> => {
    try {
      setIsBusy(true);
      const user = await authService.signInWithEmailAndPassword(input.email, input.password);
      login(user);
      if (user.emailVerified) {
        navigationService.navigateTo({
          url: '/',
        });
      } else {
        navigationService.navigateTo({
          url: '/emailVerification',
        });
      }
    } catch (error) {
      handleError(error, {
        'auth/invalid-email': t('wrongLoginCredentials'),
        'auth/user-disabled': t('userDisabled'),
        'auth/user-not-found': t('wrongLoginCredentials'),
        'auth/wrong-password': t('wrongLoginCredentials'),
      });
    } finally {
      setIsBusy(false);
    }
  };

  const loginExternal = async (loginType: LoginType): Promise<void> => {
    try {
      setIsBusy(true);
      const result = loginType === 'FACEBOOK' ? await authService.loginFacebook() : await authService.loginGoogle();
      if (result.isSuccessful) {
        login(result.user);
        navigationService.navigateTo({
          url: '/',
        });
      }
    } catch (error) {
      handleError(
        error,
        {},
        {
          'auth/user-cancelled': true,
          'auth/popup-closed-by-user': true,
        },
      );
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <AuthLayout title={t('login')}>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(context: FormikContext<LoginInput>) => {
          return (
            <form onSubmit={context.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id='email'
                      label={t('email')}
                      error={context.touched.email && !!context.errors.email}
                      value={context.values.email}
                      onChange={context.handleChange}
                      onBlur={context.handleBlur}
                      margin='normal'
                    />
                    {context.touched.email && context.errors.email && (
                      <FormHelperText error={true}>{context.errors.email}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      id='password'
                      label={t('password')}
                      error={context.touched.password && !!context.errors.password}
                      value={context.values.password}
                      onChange={context.handleChange}
                      onBlur={context.handleBlur}
                      margin='normal'
                      type='password'
                    />
                    {context.touched.password && context.errors.password && (
                      <FormHelperText error={true}>{context.errors.password}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.buttonContainer}>
                  <Button
                    disabled={isBusy}
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={classes.button}
                  >
                    {props.t('login')}
                  </Button>
                  <Button
                    disabled={isBusy}
                    variant='contained'
                    color='primary'
                    className={clsx(classes.button, classes.facebook)}
                    onClick={() => loginExternal('FACEBOOK')}
                  >
                    {props.t('loginFacebook')}
                  </Button>
                  <Button
                    disabled={isBusy}
                    variant='contained'
                    color='primary'
                    className={clsx(classes.button, classes.google)}
                    onClick={() => loginExternal('GOOGLE')}
                  >
                    {props.t('loginGoogle')}
                  </Button>
                  <Link href='/' title={props.t('backToHome')} showAsText className={classes.button}>
                    <Button disabled={isBusy} variant='contained' color='default' className={classes.linkButton}>
                      {props.t('backToHome')}
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={12} className={classes.bottomLinkContainer}>
                  <Link href='/forgotPassword' title={props.t('forgotPassword')} className={classes.bottomLink}>
                    {props.t('forgotPassword')}
                  </Link>
                  <Link href='/register' title={props.t('register')} className={classes.bottomLink}>
                    {props.t('register')}
                  </Link>
                  <LanguageSelection useFab className={classes.languageSelection} />
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </AuthLayout>
  );
};

BaseScreen.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'login'],
  };
};

export const Screen = withTranslation('login')(BaseScreen);
