import * as React from 'react';
import { useRef } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useHover } from 'react-native-web-hooks';

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
  const ref = useRef(null);
  const isHovered = useHover(ref);
  return (
    <Pressable
      style={styles.container}
      ref={ref}
      onPress={() => {
        setMainCategoryIdentifier(item.identifier);
      }}
    >
      <ImageComponent
        name={item.identifier as ImageName}
        style={isHovered ? styles.categoryImageHover : styles.categoryImage}
      />

      <Text
        style={[styles.title, isHovered && styles.titleHover]}
        medium
        semiBold
        black
      >
        {item.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 121,
    marginHorizontal: 13,
    marginVertical: 16,
    alignItems: 'center',
  },
  categoryImage: {
    width: 70,
    height: 70,
    marginBottom: 11,
  },
  categoryImageHover: {
    width: 76,
    height: 76,
    marginBottom: 11,
  },
  title: {
    width: 120,
    textAlign: 'center',
  },
  titleHover: {
    textDecorationLine: 'underline',
  },
});
