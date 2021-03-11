import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import texts from '../../../assets/texts/texts.json';
import { useAllCounties } from '../../apollo/locations/useAllCounties';
import { useLocationsByCounty } from '../../apollo/locations/useLocationsByCounty';
import { LocationInput } from '../../apollo/types/graphql-global-types';
import { Text } from '../../components/themed/Text';
import { Fetching } from '.././Fetching';

interface Props {
  selectedCounty: string;
  setSelectedCounty: React.Dispatch<React.SetStateAction<string>>;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<LocationInput | undefined>
  >;
}

export const LocationFilter: React.FC<Props> = ({
  selectedCounty,
  setSelectedCounty,
  setSelectedLocation,
}) => {
  const { data: counties, loading } = useAllCounties();

  const { data: locations } = useLocationsByCounty({ county: selectedCounty });
  if (loading || !counties) {
    return <Fetching />;
  }

  const selectCounties = counties.allCounties.map((county) => ({
    label: county,
    value: county,
  }));

  const selectLocations =
    locations &&
    locations.findLocationsByCounty.map((location) => ({
      label: location.name,
      value: location,
    }));

  return (
    <View style={styles.container}>
      <DropDownPicker
        placeholder={texts['selectCounty']}
        placeholderStyle={styles.placeholderStyle}
        items={selectCounties}
        containerStyle={styles.containerStyle}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        onChangeItem={(item) => {
          setSelectedCounty(item.value);
        }}
        searchable
        searchablePlaceholder={texts['searchForACounty']}
        searchablePlaceholderTextColor="gray"
        searchableError={() => <Text>{texts['notFound']}</Text>}
      />

      {selectLocations && (
        <DropDownPicker
          key={selectedCounty}
          placeholder={texts['searchForALocation']}
          placeholderStyle={styles.placeholderStyle}
          items={selectLocations}
          containerStyle={styles.containerStyle}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          onChangeItem={(item) => {
            setSelectedLocation({
              name: item.value.name,
              county: item.value.county,
              longitude: item.value.longitude,
              latitude: item.value.latitude,
            });
          }}
          searchable
          searchablePlaceholder={texts['searchForALocation']}
          searchablePlaceholderTextColor="grey"
          searchableError={() => <Text>{texts['notFound']}</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    zIndex: 10,
  },
  containerStyle: {
    height: 50,
    margin: 5,
    width: 200,
  },
  placeholderStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
