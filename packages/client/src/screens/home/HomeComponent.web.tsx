import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';
import { CategoriesContainer } from '../../components/Categories/CategoriesContainer';
import { MainCategoryContainer } from '../../components/MainCategories/MainCategoryContainer';
import { SearchBarComponent } from '../../components/SearchBar/SearchBarComponent';

interface Props {
  mainCategories: AllMainCategories_findAllMainCategories[];
}

export const HomeComponent: React.FC<Props> = ({ mainCategories }) => {
  const [mainCategoryId, setMainCategoryId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const navigation = useNavigation();
  const [searchInDescription, setSearchInDescription] = useState(false);

  React.useEffect(() => {
    setCategoryId('');
  }, [mainCategoryId]);

  const search = (queryString: string) => {
    navigation.navigate('AdsScreen', {
      queryString,
      searchInDescription,
      categoryId,
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.content}>
          <SearchBarComponent
            search={search}
            searchInDescription={searchInDescription}
            setSearchInDescription={setSearchInDescription}
          />
          <MainCategoryContainer
            mainCategories={mainCategories}
            setMainCategoryId={setMainCategoryId}
          />
          {mainCategoryId !== '' && (
            <CategoriesContainer
              mainCategoryId={mainCategoryId}
              setCategoryId={setCategoryId}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scroll: {
    width: '100%',
  },
  content: {
    alignItems: 'center',
    padding: 10,
  },
});
