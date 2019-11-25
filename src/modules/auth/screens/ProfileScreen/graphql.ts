import { gql } from 'apollo-boost';

export const GET_PROFILE_QUERY = gql`
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

export const UPDATE_PROFILE_MUTATION = gql`
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
