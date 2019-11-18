import React, { useState } from 'react';
import * as yup from 'yup';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Layout, Form } from '@app/components';
import {
  WithTranslation,
  withTranslation,
  FieldInfo,
  PickerDataItem,
  GET_CURRENT_USER_QUERY,
  User,
  showNotification,
  sanitizeFormData,
  getErrorMessage,
  handleError,
  initApolloClient,
} from '@app/core';
import { navigationService } from '@app/services';
import { config } from '@app/config';
import { withAuth } from '@app/hoc/WithAuth';
import { ChangePassword } from './components';

type Props = WithTranslation;

interface FormData {
  username?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email?: string;
  phoneNo?: string;
  address?: string;
  dob?: string;
  gender?: string;
}

const GET_PROFILE_QUERY = gql`
  query GetProfile($id: ID!) {
    user(id: $id) {
      username
      firstName
      middleName
      lastName
      email
      phoneNo
      address
      dob
      gender
    }
    genders {
      label
      value
    }
  }
`;

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile(
    $id: ID!
    $username: String
    $firstName: String
    $middleName: String
    $lastName: String
    $email: String
    $phoneNo: String
    $address: String
    $dob: String
    $gender: String
  ) {
    users {
      update(
        payload: {
          id: $id
          username: $username
          firstName: $firstName
          middleName: $middleName
          lastName: $lastName
          email: $email
          phoneNo: $phoneNo
          address: $address
          dob: $dob
          gender: $gender
        }
      ) {
        id
      }
    }
  }
`;

const defaultUser: User = {
  id: '',
  loginType: 'EMAIL',
};

const Screen = (props: Props): JSX.Element => {
  const { t } = props;
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
  const [usernameDisabled, setUsernameDisabled] = useState(false);
  const { data: userData } = useQuery(GET_CURRENT_USER_QUERY);
  const user = userData ? (userData.currentUser as User) : defaultUser;
  if (!user.id) {
    navigationService.navigateTo({
      url: '/',
    });
  }
  const { data, error: queryError } = useQuery(GET_PROFILE_QUERY, {
    variables: {
      id: user.id,
    },
    fetchPolicy: 'no-cache',
  });

  if (queryError) {
    showNotification({
      type: 'ERROR',
      message: queryError.graphQLErrors.length > 0 ? getErrorMessage(queryError.graphQLErrors, {}) : queryError.message,
    });
  }

  const profile = data ? sanitizeFormData(data.user as FormData) : undefined;
  const genders = [
    {
      value: '',
      label: t('common:none'),
    },
    ...(data ? (data.genders as PickerDataItem<string>[]) : []),
  ];

  const validationSchema = yup.object().shape<FormData>({
    username: yup
      .string()
      .required(
        t('common:requiredError', {
          field: t('username'),
        }),
      )
      .matches(
        config.regex.username,
        t('common:invalidError', {
          field: t('username'),
        }),
      ),
    firstName: yup.string().required(
      t('common:requiredError', {
        field: t('firstName'),
      }),
    ),
    lastName: yup.string().required(
      t('common:requiredError', {
        field: t('lastName'),
      }),
    ),
    email: yup.string().matches(
      config.regex.email,
      t('common:invalidError', {
        field: t('email'),
      }),
    ),
  });

  const onSubmit = async (input: FormData): Promise<void> => {
    try {
      setIsBusy(true);
      const apolloClient = initApolloClient();
      const { errors } = await apolloClient.mutate({
        variables: {
          id: user.id,
          ...input,
        },
        mutation: UPDATE_PROFILE_MUTATION,
      });
      if (errors) {
        showNotification({
          type: 'ERROR',
          message: getErrorMessage(errors, {
            AUTH_PHONE_NUMBER_ALREADY_EXISTS: t('common:uniqueError', {
              field: t('phoneNo'),
            }),
            INVALID_PAYLOAD_UNIQUE_USERNAME: t('common:uniqueError', {
              field: t('username'),
            }),
          }),
        });
        return;
      }
      if (input.username) {
        setUsernameDisabled(true);
      }
      showNotification({
        type: 'SUCCESS',
        message: t('common:dataSaved'),
      });
    } catch (error) {
      handleError(error, {});
    } finally {
      setIsBusy(false);
    }
  };

  const openChangePasswordModal = (): void => setOpenChangePassword(true);

  const goBack = (): void => navigationService.goBack();

  const fields: FieldInfo<FormData>[] = [
    {
      name: 'username',
      label: t('username'),
      required: true,
      placeholder: t('usernameUpdateOnlyOne'),
      disabled: usernameDisabled || (profile && !!profile.username),
    },
    {
      name: 'firstName',
      label: t('firstName'),
      required: true,
    },
    {
      name: 'middleName',
      label: t('middleName'),
    },
    {
      name: 'lastName',
      label: t('lastName'),
      required: true,
    },
    {
      name: 'email',
      label: t('email'),
      disabled: user.loginType === 'EMAIL' || user.loginType === 'GOOGLE',
    },
    {
      name: 'phoneNo',
      label: t('phoneNo'),
      disabled: user.loginType === 'PHONE_NO',
    },
    {
      name: 'address',
      label: t('address'),
    },
    {
      name: 'dob',
      label: t('dob'),
      type: 'datepicker',
    },
    {
      name: 'gender',
      label: t('gender'),
      type: 'picker',
      pickerDataSources: genders,
    },
  ];
  return (
    <Layout title={t('profile')}>
      {profile && (
        <Form
          initialValues={profile}
          fields={fields}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          isBusy={isBusy}
          buttons={[
            {
              type: 'submit',
              color: 'primary',
              title: t('common:save'),
            },
            {
              color: 'primary',
              title: t('changePassword'),
              onClick: openChangePasswordModal,
              hidden: user.loginType !== 'EMAIL',
            },
            {
              title: t('common:back'),
              onClick: goBack,
            },
          ]}
          lg={4}
          md={6}
        />
      )}
      {user.loginType === 'EMAIL' && (
        <ChangePassword
          t={t}
          isBusy={isBusy}
          setIsBusy={setIsBusy}
          open={openChangePassword}
          setOpen={setOpenChangePassword}
        />
      )}
    </Layout>
  );
};

const ScreenBeforeTranslation = withAuth(Screen);

ScreenBeforeTranslation.getInitialProps = async () => {
  return {
    namespacesRequired: ['common', 'profile'],
  };
};

export const ProfileScreen = withTranslation('profile')(ScreenBeforeTranslation);
