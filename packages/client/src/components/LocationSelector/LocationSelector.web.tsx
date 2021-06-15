import * as React from 'react';
import { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { LocationsByName_findLocationsByName } from '../../apollo/types/LocationsByName';
import { LocationQueryInput } from '../../apollo/types/graphql-global-types';
import { useComponentVisible } from '../../hooks/useComponentVisible';
import { useQueryLocations } from '../../hooks/useQueryLocations';
import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';
import { DropDown } from '../DropDown/DropDown.web';
import { Text } from '../themed/Text';

interface Props {
  setLocation?: (location?: LocationQueryInput | null) => void;
  location?: LocationQueryInput | null;
}

export const LocationSelector: React.FC<Props> = ({
  setLocation,
  location,
}) => {
  const { queryString, setQueryString, locations } = useQueryLocations({
    initialQueryString: location?.name,
  });
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible();

  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (location?.name !== queryString) {
      setQueryString(location?.name || '');
    }
  }, [location]);

  useEffect(() => {
    if (locations && inputRef.current?.isFocused()) {
      setIsComponentVisible(true);
    } else {
      setIsComponentVisible(false);
    }

    if (queryString === '') {
      setLocation && setLocation(undefined);
    }
  }, [queryString, locations]);

  const onPress = (location?: LocationsByName_findLocationsByName) => {
    if (location) {
      setQueryString(location.name);
      setLocation &&
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
      setLocation && setLocation(undefined);
      setQueryString('');
    }
    setIsComponentVisible(false);
  };

  const clear = () => {
    setQueryString('');
    inputRef.current?.focus();
    setLocation && setLocation(undefined);
  };

  return (
    <View style={styles.container} ref={ref}>
      <Icon name="location" size={20} style={styles.icon} />
      <TextInput
        ref={inputRef}
        placeholderTextColor="#585757bf"
        style={styles.input}
        value={queryString}
        onChangeText={setQueryString}
        placeholder={texts['allRomania']}
      />
      {queryString !== '' && (
        <Pressable style={styles.clear} onPress={() => clear()}>
          <Icon name="close" color="#424242" size={24} />
        </Pressable>
      )}

      {isComponentVisible && (
        <DropDown>
          <ScrollView style={styles.list}>
            <Pressable onPress={() => onPress()}>
              <Text style={styles.row}>{texts['allRomania']}</Text>
              {locations && locations?.length > 0 && (
                <View style={styles.line} />
              )}
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
        </DropDown>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Color.whiteColor,
    marginVertical: 5,
    marginLeft: 0,
    minWidth: 250,
    borderColor: Color.greyColor,
    height: '100%',
    borderWidth: 1.5,
    borderStyle: 'solid',
  },
  icon: {
    padding: 20,
    paddingRight: 18,
  },
  input: {
    height: '100%',
    width: '100%',
    fontSize: 16,
  },
  row: {
    paddingVertical: 15,
  },
  line: {
    height: 1,
    backgroundColor: Color.greyColor,
  },
  list: {
    paddingHorizontal: 20,
    maxHeight: 500,
  },
  bottomText: {
    marginVertical: 10,
  },
  clear: {
    marginRight: 10,
  },
});
