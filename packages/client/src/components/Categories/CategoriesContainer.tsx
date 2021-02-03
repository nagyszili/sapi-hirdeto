import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { useCategoriesByMainCategoryId } from '../../apollo/category/useCategoriesByMainCategoryId';
import { Fetching } from '../Fetching';
import { CategoriesComponent } from './CategoriesComponent';

interface Props {
  mainCategoryId: string;
  setCategoryId: (id: string) => void;
}

export const CategoriesContainer: React.FC<Props> = ({
  mainCategoryId,
  setCategoryId,
}) => {
  const { data: categories } = useCategoriesByMainCategoryId(mainCategoryId);

  if (!categories) {
    return <Fetching />;
  }

  return (
    <View style={styles.container}>
      <CategoriesComponent
        mainCategoryId={mainCategoryId}
        categories={categories.findCategoriesByMainCategoryId}
        setCategoryId={setCategoryId}
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
