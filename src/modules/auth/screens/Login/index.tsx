import React from 'react';
import { AuthLayout } from '@app/components';
import { withTranslation } from '@app/core';
import { WithTranslation } from 'react-i18next';
import { TextField, FormControl, FormHelperText, Button } from '@material-ui/core';
import * as yup from 'yup';
import { Formik, FormikContext } from 'formik';
import { useStyles } from './styles';

interface LoginValues {
  email: string;
  password: string;
}

const BaseLogin = (props: WithTranslation): JSX.Element => {
  const classes = useStyles();

  const loginValidateSchema = yup.object().shape({
    email: yup.string().required(props.t('pleaseInputEmail')),
    password: yup.string().required(props.t('pleaseInputPassword')),
  });

  return (
    <AuthLayout pageName='login'>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnChange={false}
        validationSchema={loginValidateSchema}
        onSubmit={async () => {
          //
        }}
      >
        {(context: FormikContext<LoginValues>) => {
          return (
            <form onSubmit={context.handleSubmit}>
              <div>
                <FormControl className={classes.fullWidth}>
                  <TextField
                    id='email'
                    label='Email'
                    error={Boolean(context.touched.email && context.errors.email)}
                    value={context.values.email}
                    onChange={context.handleChange}
                    margin='normal'
                  />
                  {context.touched.email && context.errors.email && (
                    <FormHelperText error={true}>{context.errors.email}</FormHelperText>
                  )}
                </FormControl>
              </div>

              <div>
                <FormControl className={classes.fullWidth}>
                  <TextField
                    id='password'
                    label='Password'
                    error={Boolean(context.touched.password && context.errors.password)}
                    value={context.values.password}
                    onChange={context.handleChange}
                    margin='normal'
                    type='password'
                  />
                  {context.touched.password && context.errors.password && (
                    <FormHelperText error={true}>{context.errors.password}</FormHelperText>
                  )}
                </FormControl>
              </div>

              <div className={classes.buttonContainer}>
                <Button type='submit' variant='contained' color='primary'>
                  {props.t('login')}
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </AuthLayout>
  );
};

export const Login = withTranslation('login')(BaseLogin);
