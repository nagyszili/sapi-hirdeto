import { gql } from '@apollo/client';

export const typeDefs = gql`
  scalar Object
  scalar Void

  type AlertButton {
    text: String!
    onPress: Void
    type: String!
  }

  type Alert {
    title: String!
    message: String!
    buttons: [AlertButton]
    cancelButton: AlertButton
  }

  type Modal {
    name: String!
    params: Object
  }

  type UIState {
    activeAlert: Alert
    activeModal: Modal!
    isLoading: Boolean!
  }

  extend type Query {
    isLoggedIn: Boolean!
    uiState: UIState!
    currency: String!
    asyncFavorites: [String!]!
  }
`;
