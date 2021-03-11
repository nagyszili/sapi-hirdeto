import { useQuery, gql } from '@apollo/client';

import { UIStateQuery } from '../types/UIStateQuery';

const UI_STATE = gql`
  query UIStateQuery {
    uiState @client {
      activeModal {
        name
        params
      }
      activeAlert {
        title
        message
        buttons {
          text
          onPress
          type
        }
      }
      isLoading
    }
  }
`;

export const useUiStateQuery = () =>
  useQuery<UIStateQuery, {}>(UI_STATE, { fetchPolicy: 'cache-only' });
