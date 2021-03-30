import * as React from 'react';
import { useState } from 'react';
import ImgsViewer from 'react-images-viewer';
import { View, StyleSheet, Pressable, Image } from 'react-native';

import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';

interface Props {
  images: string[];
}

export const ImageViewer: React.FC<Props> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const fullImages = images.map((img) => ({ src: img }));

  const [isFullImageVisible, setIsFullImageVisible] = useState(false);
  const [currentFullImage, setCurrentFullImage] = useState(0);
  const gotoImg = (index: number) => {
    setCurrentFullImage(index);
  };

  const onClose = () => {
    setIsFullImageVisible(false);
    setCurrentFullImage(0);
  };

  const openImgsViewer = () => {
    setCurrentFullImage(currentImage);
    setIsFullImageVisible(true);
  };

  const onLeftClick = () =>
    setCurrentImage((oldValue) =>
      oldValue === 0 ? images.length - 1 : --oldValue
    );

  const onRightClick = () =>
    setCurrentImage((oldValue) =>
      oldValue === images.length - 1 ? 0 : ++oldValue
    );
  return (
    <View style={styles.container}>
      <Pressable onPress={openImgsViewer}>
        <Image
          style={styles.largeImage}
          source={{ uri: images[currentImage] }}
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
        {images.map((image, key) => (
          <Pressable
            key={key}
            onPress={() => setCurrentImage(key)}
            style={[
              styles.smallImageContainer,
              currentImage === key && { borderColor: Color.primaryColor },
            ]}
          >
            <Image
              source={{ uri: image }}
              style={styles.smallImage}
              resizeMethod="resize"
              resizeMode="cover"
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
  largeImage: {
    width: 757,
    height: 528,
    borderRadius: 6,
  },
  gallery: {
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
    top: 234,
    left: 0,
    width: 50,
    height: 70,
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
  },
  rightArrow: {
    position: 'absolute',
    top: 234,
    right: 0,
    width: 50,
    height: 70,
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
});
