import * as React from 'react';
import ImgsViewer from 'react-images-viewer';
import { View, StyleSheet, Pressable, Image, Platform } from 'react-native';

import { Icon } from '../../utils/icons';
import { ImageComponent } from '../../utils/images';
import * as Color from '../../utils/theme/colors';
import { ImageViewerProps } from './ImageViewer.props';
import { useImageViewer } from './useImageViewer';

export const ImageViewer: React.FC<ImageViewerProps> = ({ images }) => {
  const {
    loadFallbackImage,
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
      <Pressable style={styles.largeImageContainer} onPress={openImgsViewer}>
        <Image
          style={styles.largeImage}
          source={{
            uri:
              images.length > currentImage ? fullImages[currentImage]?.src : '',
          }}
        />

        <Pressable style={styles.leftArrow} onPress={onLeftClick}>
          <Icon name="left" color={Color.whiteColor} size={32} />
        </Pressable>

        <Pressable style={styles.rightArrow} onPress={onRightClick}>
          <Icon name="right" color={Color.whiteColor} size={32} />
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
      <View style={styles.gallery}>
        {fullImages.map((image, key) => (
          <Pressable
            key={key}
            onPress={() => setCurrentImage(key)}
            style={[
              styles.smallImageContainer,
              currentImage === key && { borderColor: Color.primaryColor },
            ]}
          >
            <Image
              source={{ uri: image.src }}
              style={styles.smallImage}
              resizeMethod="resize"
              resizeMode="cover"
              onError={() => loadFallbackImage(key)}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  largeImageContainer: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  largeImage: {
    width: '100%',
    minHeight: 520,
    borderRadius: 6,
  },
  gallery: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 16,
    maxWidth: 757,
  },
  smallImageContainer: {
    padding: 4,
    borderRadius: 6,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  smallImage: {
    width: 52,
    height: 52,
    borderRadius: 6,
  },
  leftArrow: {
    position: 'absolute',
    top: '42%',
    left: 0,
    width: 50,
    height: 70,
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
    ...(Platform.OS === 'web' ? { userSelect: 'none' } : {}),
  },
  rightArrow: {
    position: 'absolute',
    top: '42%',
    right: 0,
    width: 50,
    height: 70,
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
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
