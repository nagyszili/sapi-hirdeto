import { useNavigation } from '@react-navigation/native';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import * as React from 'react';
import { SafeAreaView, View, StyleSheet, Pressable } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { HeaderBackButton } from '../../../components/Buttons/HeaderBackButton';
import { SearchBarDarkComponent } from '../../../components/SearchBarDark/SearchBarDarkComponent';
import { Icon } from '../../../utils/icons';
import { AdsListHeaderComponent } from '../AdsListHeaderComponent/AdsListHeaderComponent';
import { ListAdsContainer } from '../ListAdsContainer/ListAdsContainer';
import { AdsScreenComponentProps } from './AdsScreenComponent.props';

export const AdsScreenComponent: React.FC<AdsScreenComponentProps> = ({
  searchString,
  search,
  searchInDescription,
  selectedMainCategory,
  selectedCategory,
  filters,
  setLocation,
  creatorId,
  location,
}) => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions(headerOptions);
  });

  const headerOptions: StackHeaderOptions = {
    headerLeft: () => (
      <HeaderBackButton
        onPress={() =>
          navigation.navigate('Main', {
            screen: 'Home',
            params: { screen: 'HomeScreen' },
          })
        }
      />
    ),
    headerTitleAlign: 'center',
    headerTitleContainerStyle: {
      width: '70%',
      marginBottom: 5,
    },
    headerTitle: () => (
      <View style={styles.searchBarContainer}>
        <SearchBarDarkComponent
          search={search}
          searchString={searchString}
          placeholder={texts['searchBetweenAds']}
        />
      </View>
    ),
    headerRight: () => (
      <Pressable
        style={styles.filter}
        onPress={() =>
          navigation.navigate('FiltersScreen', {
            inDescription: searchInDescription,
            filters,
            categoryIdentifier: selectedCategory?.identifier,
            mainCategoryIdentifier: selectedMainCategory,
            query: searchString,
          })
        }
      >
        <Icon name="filter" size={22} />
      </Pressable>
    ),
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listAds}>
        <ListAdsContainer
          filters={filters}
          queryString={searchString}
          categoryIdentifier={selectedCategory?.identifier}
          mainCategoryIdentifier={selectedMainCategory}
          searchInDescription={searchInDescription}
          location={location}
          creatorId={creatorId}
          ListHeaderComponent={
            <AdsListHeaderComponent
              setLocation={setLocation}
              location={location}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listAds: {
    flex: 1,
    width: '100%',
  },
  filter: {
    padding: 5,
    marginRight: 10,
  },
  searchBarContainer: {
    minHeight: 40,
    maxHeight: 44,
    minWidth: 210,
    maxWidth: 300,
  },
});
