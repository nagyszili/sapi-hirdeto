import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { useCategoriesByMainCategoryIdentifier } from '../../apollo/category/useCategoriesByMainCategoryIdentifier';
import { Fetching } from '../Fetching';
import { CategoriesComponent } from './CategoriesComponent';

interface Props {
  mainCategoryIdentifier: string;
  setCategoryIdentifier: (id: string) => void;
}

export const CategoriesContainer: React.FC<Props> = ({
  mainCategoryIdentifier,
  setCategoryIdentifier,
}) => {
  const { data: categories } = useCategoriesByMainCategoryIdentifier(
    mainCategoryIdentifier
  );

  if (!categories) {
    return <Fetching />;
  }

  return (
    <View style={styles.container}>
      <CategoriesComponent
        mainCategoryIdentifier={mainCategoryIdentifier}
        categories={categories.findCategoriesByMainCategoryIdentifier}
        setCategoryIdentifier={setCategoryIdentifier}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
});
