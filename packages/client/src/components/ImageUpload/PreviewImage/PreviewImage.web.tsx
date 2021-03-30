import React, { useRef } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { useHover } from 'react-native-web-hooks';

import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';
import { PreviewImageProps } from './PreviewImage.props';

export const PreviewImage: React.FC<PreviewImageProps> = ({
  image,
  deleteImage,
  isThumbnail,
}) => {
  const imageRef = useRef<View>(null);
  const isHovered = useHover(imageRef);
  return (
    <View
      ref={imageRef}
      style={[styles.imageContainer, isThumbnail && styles.thumbnail]}
    >
      <Image
        style={styles.imageItem}
        source={{ uri: image }}
        resizeMethod="resize"
      />
      <View style={[styles.imageCover, !isHovered && { display: 'none' }]}>
        <Pressable style={styles.delete} onPress={deleteImage}>
          <Icon name="delete" color={Color.errorColor} size={18} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 6,
    margin: 4,
    overflow: 'hidden',
  },
  imageItem: {
    width: 170,
    height: 107,
  },
  delete: {
    padding: 7,
    backgroundColor: Color.whiteColor,
    borderRadius: 100,
  },
  imageCover: {
    zIndex: 999,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(28, 28, 28, 0.3)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    borderColor: Color.primaryDarkColor,
    borderWidth: 2,
  },
});
