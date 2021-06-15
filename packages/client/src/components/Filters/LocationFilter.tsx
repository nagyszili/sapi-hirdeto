import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { useAllCounties } from '../../apollo/locations/useAllCounties';
import { useLocationsByCounty } from '../../apollo/locations/useLocationsByCounty';
import { LocationInput } from '../../apollo/types/graphql-global-types';
import { Fetching } from '.././Fetching';
import { Element } from '../Filters/Select/SelectInput.props';
import { SelectInput } from './Select';

interface Props {
  selectedCounty: string;
  setSelectedCounty: React.Dispatch<React.SetStateAction<string>>;
  countyError?: string;
  selectedLocation?: LocationInput;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<LocationInput | undefined>
  >;
  locationError?: string;
}

export const LocationFilter: React.FC<Props> = ({
  selectedCounty,
  setSelectedCounty,
  selectedLocation,
  setSelectedLocation,
  countyError,
  locationError,
}) => {
  const { data: counties, loading } = useAllCounties();
  const [first, setFirst] = useState(true);

  const { data: locations } = useLocationsByCounty({ county: selectedCounty });
  if (loading || !counties || (!locations && first)) {
    return <Fetching />;
  }
  if (first) {
    setFirst(false);
  }

  const selectCounties = [{ label: texts['select'], value: '' }].concat(
    counties.allCounties.map((county) => ({
      label: county,
      value: county,
    }))
  );

  const getLocations = () => {
    let selectLocations: Element[] | undefined = [
      { label: texts['select'], value: undefined },
    ];

    if (locations) {
      selectLocations = selectLocations.concat(
        locations.findLocationsByCounty.map((location) => ({
          label: location.name,
          value: {
            name: location.name,
            county: location.county,
            longitude: location.longitude,
            latitude: location.latitude,
          },
        }))
      );
    }

    return selectLocations;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, { zIndex: 100 }]}>
        <SelectInput
          label={texts['county']}
          isSearchable
          elements={selectCounties}
          selectedElement={selectedCounty}
          setSelectedElement={(value) => setSelectedCounty(value)}
          error={countyError}
        />
      </View>
      <View style={[styles.row, { zIndex: 99 }]}>
        <SelectInput
          label={texts['town']}
          isSearchable
          elements={getLocations()}
          selectedElement={selectedLocation}
          setSelectedElement={setSelectedLocation}
          error={locationError}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  row: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    marginBottom: 7,
  },
});
