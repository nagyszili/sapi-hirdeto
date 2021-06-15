import { gql, useMutation } from '@apollo/client';

import { ActualizeAd, ActualizeAdVariables } from '../types/ActualizeAd';

export const ACTUALIZE_AD = gql`
  mutation ActualizeAd($id: String!) {
    actualizeAd(id: $id) {
      id
      actualizedAt
    }
  }
`;

export const useActualizeAd = (id: string) =>
  useMutation<ActualizeAd, ActualizeAdVariables>(ACTUALIZE_AD, {
    refetchQueries: ['AdsByUser', 'CurrentUser', 'AdByIdentifier'],
    variables: { id },
  });
