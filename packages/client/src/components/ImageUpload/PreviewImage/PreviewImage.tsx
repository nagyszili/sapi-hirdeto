import React from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';

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
  return (
    <View style={[styles.imageContainer, isThumbnail && styles.thumbnail]}>
      <Image
        style={styles.imageItem}
        source={{ uri: image }}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <View style={styles.buttonRow}>
        <Pressable style={[styles.smallButtonContainer]} onPress={rotate}>
          <Icon name="rotate" color={Color.primarySoftColor} size={18} />
        </Pressable>
        <Pressable style={[styles.smallButtonContainer]} onPress={setThumbnail}>
          <View style={styles.thumbnailSelector} />
        </Pressable>
        <Pressable style={[styles.smallButtonContainer]} onPress={deleteImage}>
          <Icon name="delete" color={Color.errorColor} size={18} />
        </Pressable>
      </View>
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
  buttonRow: {
    position: 'absolute',
    top: 10,
    right: 2,
    flexDirection: 'row',
  },
  thumbnail: {
    borderColor: Color.primarySoftColor,
    borderWidth: 2,
  },
  thumbnailSelector: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderColor: Color.primarySoftColor,
    borderWidth: 2,
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
    marginRight: 8,
  },
});
