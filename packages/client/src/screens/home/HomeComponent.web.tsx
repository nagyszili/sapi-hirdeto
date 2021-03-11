import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';
import { CategoriesContainer } from '../../components/Categories/CategoriesContainer';
import { CheckBoxComponent } from '../../components/CheckboxComponent';
import { Footer } from '../../components/Footer/Footer';
import { ListAdsContainer } from '../../components/ListAds/ListAdsContainer';
import { MainCategoryContainer } from '../../components/MainCategories/MainCategoryContainer';
import { SearchBarComponent } from '../../components/SearchBar/SearchBarComponent';
import { maxContentWidth } from '../../utils/theme/layout';
interface Props {
  mainCategories: AllMainCategories_findAllMainCategories[];
}

export const HomeComponent: React.FC<Props> = ({ mainCategories }) => {
  const [mainCategoryIdentifier, setMainCategoryIdentifier] = useState('');
  const [categoryIdentifier, setCategoryIdentifier] = useState('');
  const navigation = useNavigation();
  const [searchInDescription, setSearchInDescription] = useState(false);

  React.useEffect(() => {
    setCategoryIdentifier('');
  }, [mainCategoryIdentifier]);

  const search = (queryString: string) => {
    navigation.navigate('AdsScreen', {
      query: queryString || undefined,
      inDescription: searchInDescription || undefined,
      categoryIdentifier,
    });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchBarComponent
          search={search}
          searchInDescription={searchInDescription}
          setSearchInDescription={setSearchInDescription}
        />
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
        {mainCategoryIdentifier !== '' && (
          <CategoriesContainer
            mainCategoryIdentifier={mainCategoryIdentifier}
            setCategoryIdentifier={setCategoryIdentifier}
          />
        )}

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
