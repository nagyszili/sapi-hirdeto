import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';
import { CheckBoxComponent } from '../../components/CheckboxComponent';
import { Footer } from '../../components/Footer/Footer';
import { MainCategoryContainer } from '../../components/MainCategories/MainCategoryContainer';
import { SearchBarComponent } from '../../components/SearchBar/SearchBarComponent';
import { maxContentWidth } from '../../utils/theme/layout';
import { ListAdsContainer } from '../ads/ListAds/ListAdsContainer';
interface Props {
  mainCategories: AllMainCategories_findAllMainCategories[];
}

export const HomeComponent: React.FC<Props> = ({ mainCategories }) => {
  const navigation = useNavigation();
  const [searchInDescription, setSearchInDescription] = useState(false);

  const setMainCategoryIdentifier = (mainCategoryIdentifier: string) =>
    navigation.navigate('AdsScreen', {
      mainCategoryIdentifier,
    });

  const search = (queryString: string) => {
    navigation.navigate('AdsScreen', {
      query: queryString || undefined,
      inDescription: searchInDescription || undefined,
    });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchBarComponent search={search} />
        <View style={styles.searchInDesc}>
          <CheckBoxComponent
            title={texts['searchInDescription']}
            selected={searchInDescription}
            onSelect={() => setSearchInDescription((oldValue) => !oldValue)}
          />
        </View>

        <MainCategoryContainer
          mainCategories={mainCategories}
          setMainCategoryIdentifier={setMainCategoryIdentifier}
        />
        <View style={styles.list}>
          <ListAdsContainer />
        </View>

        <Footer />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 45,
  },
  searchInDesc: {
    flexDirection: 'row',
    maxWidth: maxContentWidth,
    width: '100%',
    marginBottom: 45,
    marginLeft: 45,
  },
});
