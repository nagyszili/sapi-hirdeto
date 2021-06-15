import * as React from 'react';
import { useRef } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { useHover } from 'react-native-web-hooks';

import { ImageComponent, ImageName } from '../../../utils/images';
import { Text } from '../../themed/Text';
import { MainCategoryItemProps } from './MainCategoryItem.props';

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
      <View style={styles.imageContainer}>
        <ImageComponent
          name={item.identifier as ImageName}
          style={isHovered ? styles.categoryImageHover : styles.categoryImage}
        />
      </View>

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
  imageContainer: {
    marginBottom: 11,
    width: 76,
    height: 76,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: 70,
    height: 70,
  },
  categoryImageHover: {
    width: 76,
    height: 76,
  },
  title: {
    width: 120,
    textAlign: 'center',
  },
  titleHover: {
    textDecorationLine: 'underline',
  },
});
