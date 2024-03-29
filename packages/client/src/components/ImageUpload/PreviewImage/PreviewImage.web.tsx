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
  setThumbnail,
  rotate,
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
        <Pressable style={[styles.smallButtonContainer]} onPress={rotate}>
          <Icon name="rotate" color={Color.primarySoftColor} size={18} />
        </Pressable>
        <Pressable style={styles.smallButtonContainer} onPress={setThumbnail}>
          <View style={styles.thumbnailSelector} />
        </Pressable>
        <Pressable
          style={[styles.smallButtonContainer, styles.delete]}
          onPress={deleteImage}
        >
          <Icon name="delete" color={Color.whiteColor} size={18} />
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
    width: 170,
    height: 107,
  },
  imageItem: {
    flex: 1,
  },
  smallButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    backgroundColor: Color.whiteColor,
    borderRadius: 100,
    borderColor: Color.greyColor,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  delete: {
    backgroundColor: Color.errorColor,
    borderWidth: 0,
  },
  imageCover: {
    zIndex: 999,
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
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
    borderColor: Color.primaryLightColor,
    borderWidth: 2,
  },
  thumbnailSelector: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderColor: Color.primarySoftColor,
    borderWidth: 2,
  },
  profileContainer: {
    width: 150,
    height: 150,
  },
  profilePic: {
    borderRadius: 100,
    flex: 1,
  },
  profileCover: {
    zIndex: 999,
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(28, 28, 28, 0.3)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
