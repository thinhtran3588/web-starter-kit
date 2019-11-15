import { PermissionTree } from '../interfaces';
import { initApolloClient } from './apolloClient';
import { GET_PERMISSIONS_QUERY } from './queries/getPermissions';

let permissionTree: PermissionTree;

export const getPermissionTree = async (): Promise<PermissionTree> => {
  if (permissionTree) {
    return permissionTree;
  }
  const apolloClient = initApolloClient();
  try {
    const { data, errors } = await apolloClient.query({
      query: GET_PERMISSIONS_QUERY,
    });

    if (errors) {
      permissionTree = {};
    } else {
      permissionTree = JSON.parse(data.permissions);
    }
  } catch (error) {
    permissionTree = {};
  }
  return permissionTree;
};
