import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { Icon } from '../../../utils/icons';
import { ImageComponent } from '../../../utils/images';
import * as Color from '../../../utils/theme/colors';
import { HoverText } from '../../themed/HoverText';
import { Text } from '../../themed/Text';
import { PreviewImage } from '../PreviewImage/PreviewImage.web';
import { ImageUploadContainerProps } from './ImageUploadContainer.props';

export const ImageUploadContainer: React.FC<ImageUploadContainerProps> = ({
  images,
  setImages,
}) => {
  useEffect(() => {
    setPreviewImages(images.map((image) => URL.createObjectURL(image.image)));
  }, [images]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [drag, setDrag] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  };

  const handleDragOut = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDrag(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addImages(e.dataTransfer.files);
      e.dataTransfer.clearData();
      dragCounter.current = 0;
    }
  };

  const onChange = ({ target: { files } }: any) => addImages(files);

  const addImages = (files: any) =>
    Object.values(files).forEach((file: any) => {
      if (file && file.type.match('image.*')) {
        setImages((oldValue) =>
          oldValue.length === 0
            ? [{ isThumbnail: true, image: file }]
            : [...oldValue, { isThumbnail: false, image: file }]
        );
      }
    });

  const openDialog = () => inputRef.current && inputRef.current.click();

  const deleteImage = (key: number) =>
    setImages((oldImages) =>
      oldImages
        .filter((_, index) => index !== key)
        .map((image, key) =>
          key === 0 ? { ...image, isThumbnail: true } : image
        )
    );

  return (
    <div
      style={
        images.length
          ? customStyles.container
          : drag
          ? customStyles.containerActive
          : customStyles.containerInactive
      }
      ref={dropRef}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        required
        multiple
        onChange={onChange}
        accept="image/*"
      />

      {images.length === 0 ? (
        <View style={styles.content}>
          {drag ? (
            <ImageComponent
              name="active-image-upload"
              style={styles.activeImageUpload}
            />
          ) : (
            <ImageComponent name="image-upload" style={styles.imageUpload} />
          )}
          <Text style={styles.text}>
            {texts['dragPictures']}{' '}
            <HoverText onPress={openDialog} style={styles.hoverText}>
              {texts['browse']}
            </HoverText>
          </Text>
          <Text extraSmall greyMedium>
            {texts['supportedPictures']}
          </Text>
        </View>
      ) : (
        <View style={styles.imagesContainer}>
          {images.map((_, key) => (
            <PreviewImage
              isThumbnail={key === 0}
              image={previewImages[key]}
              key={key}
              deleteImage={() => deleteImage(key)}
            />
          ))}
          <Pressable style={styles.addImage} onPress={openDialog}>
            <Icon name="plus-circle" color={Color.errorColor} size={24} />
          </Pressable>
        </View>
      )}
    </div>
  );
};

const customStyles = {
  container: {
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  containerActive: {
    border: 'dashed 2px',
    borderRadius: 4,
    borderColor: 'rgba(224, 11, 11, 0.25)',
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  containerInactive: {
    border: 'dashed 2px',
    borderRadius: 4,
    borderColor: 'rgba(150, 150, 150, 0.29)',
    backgroundColor: Color.whiteColor,
    flex: 1,
    height: '100%',
    width: '100%',
  },
};

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4,
  },
  addImage: {
    width: 170,
    height: 107,
    borderRadius: 6,
    margin: 4,
    backgroundColor: 'rgba(254, 234, 234, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#585757',
    fontSize: 15,
    marginBottom: 6,
  },
  hoverText: {
    color: Color.errorColor,
  },
  activeImageUpload: {
    width: 132,
    height: 65,
    marginBottom: 17,
  },
  imageUpload: {
    width: 55,
    height: 55,
    marginBottom: 27,
    marginRight: 9,
  },
});
