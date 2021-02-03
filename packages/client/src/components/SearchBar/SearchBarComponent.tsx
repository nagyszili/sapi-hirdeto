import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Icon } from '../../utils/icons';
import { CategoryFilter } from '../CategoryFilter';
import { CheckBoxComponent } from '../CheckboxComponent';
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
            placeholder="Search"
          />
          {queryString !== '' && (
            <TouchableOpacity
              onPress={() => {
                setQueryString('');
              }}
            >
              <Icon name="cancel" color="#424242" size={24} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            search(queryString);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
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
            name="Search in description"
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
