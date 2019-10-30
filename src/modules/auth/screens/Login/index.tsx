import React from 'react';
import firebase from 'firebase/app';
import { WithTranslation } from 'react-i18next';
import { TextField, FormControl, FormHelperText, Button, Grid } from '@material-ui/core';
import * as yup from 'yup';
import { Formik, FormikContext } from 'formik';
import clsx from 'clsx';
import { AuthLayout, Link, LanguageSelection } from '@app/components';
import { withTranslation } from '@app/core';
import { config } from '@app/config';
import { withFirebase } from '@app/hoc/withFirebase';
import { useStyles } from './styles';

interface LoginInput {
  email: string;
  password: string;
}

const initialValues: LoginInput = {
  email: '',
  password: '',
};

const BaseLogin = (props: WithTranslation): JSX.Element => {
  const { t } = props;
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

  const login = async (input: LoginInput): Promise<void> => {
    if (!firebase) {
      return;
    }
    const user = await firebase.auth().signInWithEmailAndPassword(input.email, input.password);
    // eslint-disable-next-line no-console
    console.log(user);
  };

  return (
    <AuthLayout title={t('login')}>
      <Formik
        initialValues={initialValues}
        validateOnChange={false}
        validationSchema={validationSchema}
        onSubmit={login}
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
                  <Button type='submit' variant='contained' color='primary' className={classes.button}>
                    {props.t('login')}
                  </Button>
                  <Button variant='contained' color='primary' className={clsx(classes.button, classes.facebook)}>
                    {props.t('loginFacebook')}
                  </Button>
                  <Button variant='contained' color='primary' className={clsx(classes.button, classes.google)}>
                    {props.t('loginGoogle')}
                  </Button>
                  <Link href='/' title={props.t('backToHome')} showAsText className={classes.button}>
                    <Button variant='contained' color='default' className={classes.linkButton}>
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

BaseLogin.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'login'],
  };
};

export const Login = withFirebase(withTranslation('login')(BaseLogin));
