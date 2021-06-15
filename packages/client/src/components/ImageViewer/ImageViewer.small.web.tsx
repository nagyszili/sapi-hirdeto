import * as React from 'react';
import ImgsViewer from 'react-images-viewer';
import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  Platform,
} from 'react-native';

import { Icon } from '../../utils/icons';
import { ImageComponent } from '../../utils/images';
import * as Color from '../../utils/theme/colors';
import { ImageViewerProps } from './ImageViewer.props';
import { useImageViewer } from './useImageViewer';

export const ImageViewer: React.FC<ImageViewerProps> = ({ images }) => {
  const {
    onRightClick,
    onLeftClick,
    openImgsViewer,
    onClose,
    gotoImg,
    fullImages,
    currentImage,
    currentFullImage,
    isFullImageVisible,
    setCurrentFullImage,
    setCurrentImage,
  } = useImageViewer({ images });

  if (images.length === 0) {
    return (
      <View style={styles.largeImage}>
        <View style={styles.image}>
          <ImageComponent
            style={styles.imagePlaceholder}
            name="placeholder"
            resizeMode="contain"
            resizeMethod="scale"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={openImgsViewer}>
        <Image
          style={styles.largeImage}
          source={{
            uri:
              images.length > currentImage ? fullImages[currentImage]?.src : '',
          }}
        />

        <Pressable style={styles.leftArrow} onPress={onLeftClick}>
          <Icon name="left" color={Color.whiteColor} size={30} />
        </Pressable>

        <Pressable style={styles.rightArrow} onPress={onRightClick}>
          <Icon name="right" color={Color.whiteColor} size={30} />
        </Pressable>
      </Pressable>
      <ImgsViewer
        imgs={fullImages}
        closeBtnTitle=""
        leftArrowTitle=""
        rightArrowTitle=""
        isOpen={isFullImageVisible}
        backdropCloseable
        preloadNextImg
        currImg={currentFullImage}
        onClickPrev={() => setCurrentFullImage((oldValue) => --oldValue)}
        onClickNext={() => setCurrentFullImage((oldValue) => ++oldValue)}
        onClose={onClose}
        onClickThumbnail={gotoImg}
        showThumbnails
      />
      <View style={styles.pagination}>
        {fullImages.map((_, key) => (
          <Pressable
            key={key}
            onPress={() => setCurrentImage(key)}
            style={[styles.imageDot, currentImage === key && { opacity: 1 }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  largeImage: {
    height: 311,
    width: Dimensions.get('window').width,
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    paddingVertical: 16,
  },
  imageDot: {
    borderRadius: 6,
    margin: 5,
    backgroundColor: Color.whiteColor,
    height: 10,
    width: 10,
    opacity: 0.6,
  },
  smallImage: {
    width: 52,
    height: 52,
    borderRadius: 6,
  },
  leftArrow: {
    position: 'absolute',
    top: '45%',
    left: 0,
    width: 40,
    height: 60,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    ...(Platform.OS === 'web' ? { userSelect: 'none' } : {}),
  },
  rightArrow: {
    position: 'absolute',
    top: '45%',
    right: 0,
    width: 40,
    height: 60,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'flex-end',
    ...(Platform.OS === 'web' ? { userSelect: 'none' } : {}),
  },
  image: {
    flex: 1,
    backgroundColor: Color.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 200,
    height: 120,
  },
});
