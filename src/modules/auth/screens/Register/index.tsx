import React from 'react';
import { AuthLayout } from '@app/components';
import { Grid, TextField, FormControl, FormHelperText, Button } from '@material-ui/core';
import { Formik, FormikContext } from 'formik';
import * as yup from 'yup';
import { withTranslation } from '@app/core';
import { WithTranslation } from 'react-i18next';
import { config } from '@app/config';
import { useStyles } from './styles';

interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNo: string;
}

const BaseRegister = (props: WithTranslation): JSX.Element => {
  const classes = useStyles();

  const registerValidateSchema = yup.object().shape({
    firstName: yup
      .string()
      .required(props.t('pleaseInputFirstname'))
      .max(50, props.t('firstNameTooLong')),
    lastName: yup
      .string()
      .required(props.t('pleaseInputLastname'))
      .max(50, props.t('lastNameTooLong')),
    email: yup
      .string()
      .required(props.t('pleaseInputEmail'))
      .matches(config.regex.email, props.t('invalidEmail')),
    password: yup
      .string()
      .matches(config.regex.password, props.t('invalidPasswordRegex'))
      .required(props.t('pleaseInputPassword')),
    confirmPassword: yup
      .string()
      .required(props.t('pleaseConfirmPassword'))
      .when('password', {
        is: (password) => Boolean(password),
        then: yup
          .string()
          .required(props.t('pleaseConfirmPassword'))
          .oneOf([yup.ref('password')], props.t('confirmPasswordDidntMatch')),
        otherwise: yup.string().required(props.t('pleaseConfirmPassword')),
      }),
    phoneNo: yup
      .string()
      .required(props.t('pleaseInputPhoneNo'))
      .matches(config.regex.phone, props.t('invalidPhoneNo')),
  });

  return (
    <AuthLayout pageName='register'>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNo: '',
        }}
        validateOnChange={false}
        validationSchema={registerValidateSchema}
        onSubmit={async () => {
          //
        }}
      >
        {(context: FormikContext<RegisterValues>) => {
          return (
            <form onSubmit={context.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl className={classes.fullWidth}>
                    <TextField
                      id='firstName'
                      label='First name'
                      error={Boolean(context.touched.firstName && context.errors.firstName)}
                      value={context.values.firstName}
                      onChange={context.handleChange}
                      margin='normal'
                    />
                    {context.touched.firstName && context.errors.firstName && (
                      <FormHelperText error={true}>{context.errors.firstName}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.fullWidth}>
                    <TextField
                      id='lastName'
                      label='Last name'
                      error={Boolean(context.touched.lastName && context.errors.lastName)}
                      value={context.values.lastName}
                      onChange={context.handleChange}
                      margin='normal'
                    />
                    {context.touched.lastName && context.errors.lastName && (
                      <FormHelperText error={true}>{context.errors.lastName}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

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

              <div>
                <FormControl className={classes.fullWidth}>
                  <TextField
                    id='confirmPassword'
                    label='Confirm password'
                    error={Boolean(context.touched.confirmPassword && context.errors.confirmPassword)}
                    value={context.values.confirmPassword}
                    onChange={context.handleChange}
                    margin='normal'
                    type='password'
                  />
                  {context.touched.confirmPassword && context.errors.confirmPassword && (
                    <FormHelperText error={true}>{context.errors.confirmPassword}</FormHelperText>
                  )}
                </FormControl>
              </div>

              <div>
                <FormControl className={classes.fullWidth}>
                  <TextField
                    id='phoneNo'
                    label='Phone number'
                    error={Boolean(context.touched.phoneNo && context.errors.phoneNo)}
                    value={context.values.phoneNo}
                    onChange={context.handleChange}
                    margin='normal'
                  />
                  {context.touched.phoneNo && context.errors.phoneNo && (
                    <FormHelperText error={true}>{context.errors.phoneNo}</FormHelperText>
                  )}
                </FormControl>
              </div>

              <div className={classes.buttonContainer}>
                <Button type='submit' variant='contained' color='primary'>
                  {props.t('register')}
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </AuthLayout>
  );
};

export const Register = withTranslation('register')(BaseRegister);
