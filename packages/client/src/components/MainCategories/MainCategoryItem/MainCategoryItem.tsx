import * as React from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { AllMainCategories_findAllMainCategories } from '../../../apollo/types/AllMainCategories';
import { ImageComponent, ImageName } from '../../../utils/images';
import { Text } from '../../themed/Text';

export interface MainCategoryItemProps {
  item: AllMainCategories_findAllMainCategories;
  setMainCategoryIdentifier: (mainCategoryIdentifier: string) => void;
}
export const MainCategoryItem: React.FC<MainCategoryItemProps> = ({
  item,
  setMainCategoryIdentifier,
}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setMainCategoryIdentifier(item.identifier);
      }}
    >
      <ImageComponent
        name={item.identifier as ImageName}
        style={styles.categoryImage}
      />

      <Text style={styles.categoryName} small semiBold black>
        {item.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 12,
    alignItems: 'center',
  },
  categoryImage: {
    width: 54,
    height: 54,
    marginBottom: 6,
  },
  categoryName: {
    width: 120,
    textAlign: 'center',
  },
});
