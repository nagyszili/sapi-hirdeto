import { gql, useLazyQuery } from '@apollo/client';

import {
  LocationsByName,
  LocationsByNameVariables,
} from '../types/LocationsByName';

export const FIND_LOCATIONS_BY_NAME = gql`
  query LocationsByName($name: String!, $limit: Int!) {
    findLocationsByName(name: $name, limit: $limit) {
      name
      county
      type
    }
  }
`;

export const useLocationsByName = () =>
  useLazyQuery<LocationsByName, LocationsByNameVariables>(
    FIND_LOCATIONS_BY_NAME
  );
