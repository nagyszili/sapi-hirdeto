import { gql } from '@apollo/client';

export const typeDefs = gql`
  scalar Object
  scalar Void

  extend type Query {
    isLoggedIn: Boolean!
    currency: String!
  }
`;
