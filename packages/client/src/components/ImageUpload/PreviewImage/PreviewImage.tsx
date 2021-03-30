import React from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';

import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';
import { PreviewImageProps } from './PreviewImage.props';

export const PreviewImage: React.FC<PreviewImageProps> = ({
  image,
  deleteImage,
  isThumbnail,
}) => {
  return (
    <View style={[styles.imageContainer, isThumbnail && styles.thumbnail]}>
      <Image
        style={styles.imageItem}
        source={{ uri: image }}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <Pressable style={styles.delete} onPress={deleteImage}>
        <Icon name="delete" color={Color.errorColor} size={18} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 6,
    marginRight: 12,
    width: 237,
    height: 149,
    overflow: 'hidden',
  },
  imageItem: {
    width: '100%',
    height: '100%',
  },
  delete: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 7,
    backgroundColor: Color.whiteColor,
    borderRadius: 100,
  },
  thumbnail: {
    borderColor: Color.primaryDarkColor,
    borderWidth: 2,
  },
});
