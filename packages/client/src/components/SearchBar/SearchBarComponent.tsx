import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { Text } from '../../components/themed/Text';
import { Icon } from '../../utils/icons';
import { CheckBoxComponent } from '../CheckboxComponent';
import { CategoryFilter } from '../Filters/CategoryFilter';
import { SearchBarComponentProps } from './SearchBarComponent.props';

export const SearchBarComponent: React.FC<SearchBarComponentProps> = ({
  searchString,
  search,
  setSearchInDescription,
  searchInDescription,
  mainCategories,
  selectedMainCategory,
  setSelectedMainCategory,
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
            placeholder={texts['search']}
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
        <Pressable
          style={styles.searchButton}
          onPress={() => {
            search(queryString);
          }}
        >
          <Text style={styles.searchText}>{texts['search']}</Text>
        </Pressable>
      </View>
      <View style={styles.filters}>
        <ScrollView style={styles.filters} horizontal>
          {mainCategories && setSelectedMainCategory && (
            <CategoryFilter
              categories={mainCategories}
              selectedCategory={selectedMainCategory}
              setSelectedCategory={setSelectedMainCategory}
            />
          )}
          <CheckBoxComponent
            title={texts['searchInDescription']}
            selected={searchInDescription}
            onSelect={() => setSearchInDescription(!searchInDescription)}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    minWidth: 260,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderRadius: 6,
    shadowColor: '#9E9E9E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10,
  },
  searchButton: {
    height: '80%',
    width: '20%',
    backgroundColor: '#546E7A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchText: {
    color: 'white',
    fontSize: 18,
  },
  filters: {
    flexDirection: 'row',
  },
});
