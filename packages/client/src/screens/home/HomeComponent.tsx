import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';
import { CategoriesContainer } from '../../components/Categories/CategoriesContainer';
import { ListAdsContainer } from '../../components/ListAds/ListAdsContainer';
import { MainCategoryContainer } from '../../components/MainCategories/MainCategoryContainer';

interface Props {
  mainCategories: AllMainCategories_findAllMainCategories[];
}

export const HomeComponent: React.FC<Props> = ({ mainCategories }) => {
  const [mainCategoryId, setMainCategoryId] = useState('');
  const [categoryId, setCategoryId] = useState('');

  React.useEffect(() => {
    setCategoryId('');
  }, [mainCategoryId]);
  return (
    <View style={styles.container}>
      <MainCategoryContainer
        mainCategories={mainCategories}
        setMainCategoryId={setMainCategoryId}
      />
      {mainCategoryId !== '' && (
        <>
          <CategoriesContainer
            mainCategoryId={mainCategoryId}
            setCategoryId={setCategoryId}
          />
          {/* <ListAdsContainer
            categoryId={categoryId}
            mainCategoryId={mainCategoryId}
          /> */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '75%',
    alignItems: 'center',
  },
});
