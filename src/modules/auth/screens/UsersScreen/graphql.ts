import { gql } from 'apollo-boost';

export const GET_USERS_LOOKUPS_QUERY = gql`
  query getUsersLookups {
    roles(payload: { paginationType: NONE }) {
      data {
        id
        name
        permissions
        isActive
        isDefault
      }
    }
    authLookups {
      genders {
        label
        value
      }
    }
  }
`;

export const GET_USERS_QUERY = gql`
  query getUsers(
    $filter: String
    $loginType: String
    $role: String
    $pageIndex: Int!
    $itemsPerPage: Int!
    $orderBy: String
  ) {
    users(
      payload: {
        filter_textSearch: $filter
        roles_contains: $role
        loginDetail_loginType_eq: $loginType
        pageIndex: $pageIndex
        itemsPerPage: $itemsPerPage
        orderBy: $orderBy
      }
    ) {
      data {
        id
        username
        displayName
        email
        phoneNo
        loginDetail {
          ... on FacebookLogin {
            loginType
          }
          ... on GoogleLogin {
            loginType
          }
          ... on EmailLogin {
            loginType
          }
          ... on PhoneNoLogin {
            loginType
          }
        }
        roles
        isActive
        lastLoggedInAt
        createdAt
        createdByName
        lastModifiedAt
        lastModifiedByName
      }
      pagination {
        type
        total
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  query getUser($id: ID!) {
    usersById(id: $id) {
      username
      firstName
      middleName
      lastName
      email
      phoneNo
      address
      dob
      gender
      roles
      isActive
      loginDetail {
        ... on FacebookLogin {
          loginType
        }
        ... on GoogleLogin {
          loginType
        }
        ... on EmailLogin {
          loginType
        }
        ... on PhoneNoLogin {
          loginType
        }
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String!
    $middleName: String
    $lastName: String!
    $phoneNo: String
    $address: String
    $avatarUrl: String
    $dob: String
    $gender: String
    $roles: [String!]!
    $isActive: Boolean!
  ) {
    users {
      create(
        payload: {
          username: $username
          email: $email
          password: $password
          firstName: $firstName
          middleName: $middleName
          lastName: $lastName
          phoneNo: $phoneNo
          address: $address
          avatarUrl: $avatarUrl
          dob: $dob
          gender: $gender
          roles: $roles
          isActive: $isActive
        }
      ) {
        id
      }
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: ID!
    $username: String
    $email: String
    $password: String
    $firstName: String
    $middleName: String
    $lastName: String
    $phoneNo: String
    $address: String
    $avatarUrl: String
    $dob: String
    $gender: String
    $roles: [String!]
    $isActive: Boolean
  ) {
    users {
      update(
        payload: {
          id: $id
          username: $username
          email: $email
          password: $password
          firstName: $firstName
          middleName: $middleName
          lastName: $lastName
          phoneNo: $phoneNo
          address: $address
          avatarUrl: $avatarUrl
          dob: $dob
          gender: $gender
          roles: $roles
          isActive: $isActive
        }
      ) {
        id
      }
    }
  }
`;
