import { gql, useQuery } from '@apollo/client';

import {
  LocationsByCounty,
  LocationsByCountyVariables,
} from '../types/LocationsByCounty';

export const FIND_LOCATIONS_BY_COUNTY = gql`
  query LocationsByCounty($county: String!) {
    findLocationsByCounty(county: $county) {
      name
      county
      longitude
      latitude
    }
  }
`;

export const useLocationsByCounty = (variables: LocationsByCountyVariables) =>
  useQuery<LocationsByCounty, LocationsByCountyVariables>(
    FIND_LOCATIONS_BY_COUNTY,
    { variables }
  );
