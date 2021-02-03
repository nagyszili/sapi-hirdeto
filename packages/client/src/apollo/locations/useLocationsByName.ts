import { gql, useQuery } from '@apollo/client';

import {
  LocationsByName,
  LocationsByNameVariables,
} from '../types/LocationsByName';

export const FIND_LOCATIONS_BY_NAME = gql`
  query LocationsByName($name: String!) {
    findLocationsByName(name: $name) {
      name
      county
      longitude
      latitude
    }
  }
`;

export const useLocationsByName = (variables: LocationsByNameVariables) =>
  useQuery<LocationsByName, LocationsByNameVariables>(FIND_LOCATIONS_BY_NAME, {
    variables,
  });
