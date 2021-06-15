import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { Icon } from '../../utils/icons';
import { whiteColor } from '../../utils/theme/colors';
import { SearchBarComponentProps } from './SearchBarComponent.props';

export const SearchBarComponent: React.FC<SearchBarComponentProps> = ({
  searchString,
  search,
}) => {
  const [queryString, setQueryString] = useState(searchString || '');

  const onChangeSearch = (query: string) => setQueryString(query);
  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Icon name="search" color="#424242" size={24} />
          <TextInput
            style={styles.input}
            value={queryString}
            onChangeText={onChangeSearch}
            placeholder={texts['searchBetweenAds']}
            placeholderTextColor="rgba(88, 87, 87, 0.75)"
            onSubmitEditing={() => search(queryString)}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: whiteColor,
    height: 60,
    width: '100%',
    borderRadius: 6,
  },
  input: {
    flex: 1,
    fontSize: 15,
    marginHorizontal: 10,
    height: '100%',
  },
  filters: {
    flexDirection: 'row',
  },
});
