import { useState, useEffect } from 'react';

import { useLocationsByName } from '../apollo/locations/useLocationsByName';
interface Props {
  limit?: number;
  minChar?: number;
  initialQueryString?: string;
}

export const useQueryLocations = ({
  limit = 100,
  minChar = 1,
  initialQueryString = '',
}: Props) => {
  const [queryString, setQueryString] = useState(initialQueryString);

  const [queryLocations, { data: locations }] = useLocationsByName();

  const [locationsState, setLocationState] = useState(locations);

  useEffect(() => {
    if (locations) {
      setLocationState(locations);
    }
  }, [locations]);

  useEffect(() => {
    queryLocations({ variables: { name: queryString, limit } });
  }, [queryString]);

  return {
    queryString,
    setQueryString,
    locations:
      queryString.length > minChar
        ? locationsState?.findLocationsByName
        : undefined,
    queryLocations,
  };
};
