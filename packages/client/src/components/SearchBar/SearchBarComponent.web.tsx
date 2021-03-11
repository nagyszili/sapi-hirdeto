import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { Text } from '../../components/themed/Text';
import { Icon } from '../../utils/icons';
import { primaryColor, whiteColor } from '../../utils/theme/colors';
import { maxContentWidth } from '../../utils/theme/layout';
import { Button } from '../Buttons/Button';
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
          <Icon name="search" size={20} style={styles.searchBarIcon} />
          <TextInput
            placeholderTextColor="#585757bf"
            style={styles.input}
            value={queryString}
            onChangeText={onChangeSearch}
            placeholder={texts['searchBetweenAds']}
          />
        </View>
        <Button
          style={styles.searchButton}
          onPress={() => {
            search(queryString);
          }}
        >
          <Icon
            name="search"
            color={whiteColor}
            size={20}
            style={styles.searchIcon}
          />
          <Text small semiBold style={styles.searchText}>
            {texts['search']}
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 34,
    maxWidth: maxContentWidth,
    zIndex: 10,
  },
  searchRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 5,
    marginLeft: 0,
    minWidth: 250,
    height: 60,
    borderColor: '#E4E4E4',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  input: {
    height: '100%',
    flex: 1,
    fontSize: 16,
  },
  searchBarIcon: {
    padding: 20,
    paddingRight: 18,
  },
  searchButton: {
    height: 60,
    width: 120,
    borderRadius: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: primaryColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  searchText: {
    color: whiteColor,
  },
  searchIcon: {
    marginRight: 12,
  },
  categoryFilter: {
    marginRight: 10,
  },
});
