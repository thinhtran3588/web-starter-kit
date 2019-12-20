import { gql } from 'apollo-boost';

export const GET_AGGREGATE_CONFIGS_QUERY = gql`
  query getAggregateConfigs {
    aggregateConfigs {
      data {
        id
        name
        viewFields
        updateFields
        customActions
        excludedActions
      }
    }
  }
`;

export const GET_ROLES_QUERY = gql`
  query getRoles($filter: String, $pageIndex: Int!, $itemsPerPage: Int!, $orderBy: String) {
    roles(
      payload: { filter_textSearch: $filter, pageIndex: $pageIndex, itemsPerPage: $itemsPerPage, orderBy: $orderBy }
    ) {
      data {
        id
        name
        description
        isActive
        isDefault
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

export const DELETE_ROLE_MUTATION = gql`
  mutation DeleteRole($id: ID!) {
    roles {
      delete(payload: { id: $id }) {
        id
      }
    }
  }
`;

export const GET_ROLE_QUERY = gql`
  query getRole($id: ID!) {
    rolesById(id: $id) {
      id
      name
      description
      isActive
      isDefault
      permissions
    }
  }
`;

export const CREATE_ROLE_MUTATION = gql`
  mutation CreateRole(
    $name: String!
    $description: String!
    $isActive: Boolean!
    $isDefault: Boolean!
    $permissions: String!
  ) {
    roles {
      create(
        payload: {
          name: $name
          description: $description
          isActive: $isActive
          isDefault: $isDefault
          permissions: $permissions
        }
      ) {
        id
      }
    }
  }
`;

export const UPDATE_ROLE_MUTATION = gql`
  mutation UpdateRole(
    $id: ID!
    $name: String
    $description: String
    $isActive: Boolean
    $isDefault: Boolean
    $permissions: String
  ) {
    roles {
      update(
        payload: {
          id: $id
          name: $name
          description: $description
          isActive: $isActive
          isDefault: $isDefault
          permissions: $permissions
        }
      ) {
        id
      }
    }
  }
`;
