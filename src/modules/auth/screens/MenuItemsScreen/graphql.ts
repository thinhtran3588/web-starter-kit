import { gql } from 'apollo-boost';

export const GET_MENU_ITEMS_QUERY = gql`
  query getMenuItems($type: MenuItemType, $lang: String, $pageIndex: Int!, $itemsPerPage: Int!, $orderBy: String) {
    menuItems(
      payload: { type_eq: $type, lang_eq: $lang, pageIndex: $pageIndex, itemsPerPage: $itemsPerPage, orderBy: $orderBy }
    ) {
      data {
        id
        lang
        name
        url
        permissions
        isActive
        parentId
        order
        icon
        type
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

export const DELETE_MENU_ITEM_MUTATION = gql`
  mutation DeleteMenuItem($id: ID!) {
    menuItems {
      delete(payload: { id: $id }) {
        id
      }
    }
  }
`;

export const GET_MENU_ITEM_QUERY = gql`
  query getMenuItem($id: ID!) {
    menuItem(id: $id) {
      id
      lang
      name
      url
      permissions
      isActive
      parentId
      order
      icon
      type
    }
  }
`;

export const CREATE_MENU_ITEM_MUTATION = gql`
  mutation CreateMenuItem(
    $lang: String!
    $name: String!
    $url: String!
    $permissions: String!
    $isActive: Boolean!
    $parentId: String
    $order: Int!
    $type: MenuItemType!
  ) {
    menuItems {
      create(
        payload: {
          lang: $lang
          name: $name
          url: $url
          permissions: $permissions
          isActive: $isActive
          parentId: $parentId
          order: $order
          type: $type
        }
      ) {
        id
      }
    }
  }
`;

export const UPDATE_MENU_ITEM_MUTATION = gql`
  mutation UpdateMenuItem(
    $id: ID!
    $lang: String
    $name: String
    $url: String
    $permissions: String
    $isActive: Boolean
    $parentId: String
    $order: Int
    $type: MenuItemType
  ) {
    menuItems {
      update(
        payload: {
          id: $id
          lang: $lang
          name: $name
          url: $url
          permissions: $permissions
          isActive: $isActive
          parentId: $parentId
          order: $order
          type: $type
        }
      ) {
        id
      }
    }
  }
`;
