import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import { Icon } from '../../utils/icons';
import { CategoryFilter } from '../CategoryFilter';
import { CheckBoxComponent } from '../CheckboxComponent';
import { FiltersContainer } from '../FiltersContainer';
import { SearchBarComponentProps } from './SearchBarComponent.props';

export const SearchBarComponent: React.FC<SearchBarComponentProps> = ({
  searchString,
  search,
  searchInDescription,
  setSearchInDescription,
  mainCategories,
  selectedMainCategory,
  setSelectedMainCategory,
  categories,
  selectedCategory,
  setSelectedCategory,
  filters,
  setFilters,
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
        {mainCategories && setSelectedMainCategory && (
          <CategoryFilter
            style={styles.categoryFilter}
            categories={mainCategories}
            selectedCategory={selectedMainCategory}
            setSelectedCategory={setSelectedMainCategory}
          />
        )}
        {categories && categories.length > 0 && setSelectedCategory && (
          <CategoryFilter
            style={styles.categoryFilter}
            categories={categories}
            selectedCategory={selectedCategory?.id}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        <CheckBoxComponent
          name="Search in description"
          selected={searchInDescription}
          onSelect={() => setSearchInDescription(!searchInDescription)}
        />
        {filters && setFilters && (
          <FiltersContainer
            filters={filters}
            setFilters={setFilters}
            attributes={selectedCategory?.attributes}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    maxWidth: 1200,
    minWidth: 500,
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
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    marginLeft: 0,
    minWidth: 250,
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
    height: 50,
    width: 200,
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
  categoryFilter: {
    marginRight: 10,
  },
});
