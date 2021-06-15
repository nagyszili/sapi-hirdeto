import { gql, useMutation } from '@apollo/client';

import { SetAdStatus, SetAdStatusVariables } from '../types/SetAdStatus';

export const SET_AD_STATUS = gql`
  mutation SetAdStatus(
    $id: String!
    $status: String!
    $reasonOfDelete: String
  ) {
    setAdStatus(id: $id, status: $status, reasonOfDelete: $reasonOfDelete) {
      id
      status
    }
  }
`;

export const useSetAdStatus = () =>
  useMutation<SetAdStatus, SetAdStatusVariables>(SET_AD_STATUS, {
    refetchQueries: ['AdsByUser', 'CurrentUser', 'AllAds'],
  });
