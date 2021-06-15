import * as React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { LocationsByName_findLocationsByName } from '../../apollo/types/LocationsByName';
import { Text } from '../../components/themed/Text';
import { useQueryLocations } from '../../hooks/useQueryLocations';
import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';
import { LocationModalParams, ModalCommonProps } from '../types';

type Props = LocationModalParams & ModalCommonProps;

export const LocationModal: React.FC<Props> = ({
  setTitle,
  hideModal,
  setLocation,
}) => {
  React.useLayoutEffect(() => {
    setTitle(texts['location']);
  }, []);
  const { queryString, setQueryString, locations } = useQueryLocations({});

  const onPress = (location?: LocationsByName_findLocationsByName) => {
    if (location) {
      setLocation(
        location.type === 'location'
          ? {
              type: location.type,
              name: location.name,
              county: location.county,
            }
          : {
              type: location.type,
              name: location.name,
            }
      );
    } else {
      setLocation(undefined);
    }

    hideModal && hideModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <View style={styles.searchBar}>
          <Icon name="search" color="rgba(0, 0, 0, 0.5)" size={24} />
          <TextInput
            style={styles.input}
            value={queryString}
            onChangeText={setQueryString}
            placeholder={texts['searchLocation']}
            placeholderTextColor="rgba(88, 87, 87, 0.75)"
            returnKeyType="search"
          />
          {queryString !== '' && (
            <Pressable
              onPress={() => {
                setQueryString('');
              }}
            >
              <Icon name="close" color="#424242" size={24} />
            </Pressable>
          )}
        </View>
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => onPress()}>
            <Text style={styles.row}>{texts['allRomania']}</Text>
            {locations && locations?.length > 0 && <View style={styles.line} />}
          </Pressable>
          {locations &&
            locations.map((location, key) => (
              <Pressable key={key} onPress={() => onPress(location)}>
                <Text style={styles.row}>
                  {location.type === 'county' && texts['countyRo'] + ' '}
                  {location.name}
                  {location.type === 'location' && ', ' + location.county}
                </Text>
                {locations.length > key + 1 && <View style={styles.line} />}
              </Pressable>
            ))}
          <Text style={styles.bottomText} extraSmall greyMedium>
            {texts['typeForMoreLocation']}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    backgroundColor: Color.greyLightColor,
    height: '100%',
  },
  group: {
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    paddingTop: 18,
    maxHeight: '70%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: Color.greyColor,
    height: 44,
    borderRadius: 6,
  },
  input: {
    flex: 1,
    fontSize: 15,
    marginHorizontal: 10,
    height: '100%',
    color: Color.blackColor,
  },
  row: {
    paddingVertical: 15,
  },
  line: {
    height: 1,
    backgroundColor: Color.greyColor,
  },
  list: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  bottomText: {
    marginVertical: 10,
  },
});
