import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';
import { CategoriesContainer } from '../../components/Categories/CategoriesContainer';
import { MainCategoryContainer } from '../../components/MainCategories/MainCategoryContainer';

interface Props {
  mainCategories: AllMainCategories_findAllMainCategories[];
}

export const HomeComponent: React.FC<Props> = ({ mainCategories }) => {
  const [mainCategoryIdentifier, setMainCategoryIdentifier] = useState('');
  const [, setCategoryIdentifier] = useState('');

  React.useEffect(() => {
    setCategoryIdentifier('');
  }, [mainCategoryIdentifier]);
  return (
    <View style={styles.container}>
      <MainCategoryContainer
        mainCategories={mainCategories}
        setMainCategoryIdentifier={setMainCategoryIdentifier}
      />
      {mainCategoryIdentifier !== '' && (
        <>
          <CategoriesContainer
            mainCategoryIdentifier={mainCategoryIdentifier}
            setCategoryIdentifier={setCategoryIdentifier}
          />
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
