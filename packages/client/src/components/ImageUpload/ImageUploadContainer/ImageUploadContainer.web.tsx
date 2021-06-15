import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { ImageUpdate } from '../../../apollo/types/graphql-global-types';
import { MAX_IMAGES_NUM } from '../../../utils/constants';
import { Icon } from '../../../utils/icons';
import { ImageComponent } from '../../../utils/images';
import * as Color from '../../../utils/theme/colors';
import { HoverText } from '../../themed/HoverText';
import { Text } from '../../themed/Text';
import { PreviewImage } from '../PreviewImage/PreviewImage.web';
import { imageResize, imageRotate } from '../imageManipulators';
import { newFile } from '../imageUtils';
import { ImageUploadContainerProps } from './ImageUploadContainer.props';

export const ImageUploadContainer: React.FC<ImageUploadContainerProps> = ({
  images,
  setImages,
  setThumbnail,
  thumbnail,
  setDeletedImages,
}) => {
  useEffect(() => {
    setPreviewImages(
      images.map((image) =>
        image.url ? image.url : URL.createObjectURL(image.image)
      )
    );
  }, [images]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [drag, setDrag] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const [progress, setProgress] = useState<boolean>(false);
  const [numOfImages, setNumOfImages] = useState(images.length);

  useEffect(() => {
    if (images.length === numOfImages) {
      setProgress(false);
    }
  });

  useEffect(() => {
    if (images.length && !thumbnail) {
      const image = images.find((image) => image.priority === 1);
      image && _setThumbnail(image);
    }
  }, [images]);

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

  const handleChange = ({ target: { files } }: any) => addImages(files);

  const addImages = async (files: any) => {
    if (images.length + files.length > MAX_IMAGES_NUM) {
      return alert('Maximum number of images is 8');
    }
    setProgress(true);
    setNumOfImages(images.length + files.length);
    await Promise.all(
      Object.values(files).map(async (file: any) => {
        if (file && file.type.match('image.*')) {
          var reader = new FileReader();
          reader.onload = async () => {
            const imageType = file.type.split('/');
            const arrayBuffer = reader.result as ArrayBuffer;
            const array = new Uint8Array(arrayBuffer);
            const imageBuffer = await imageResize(Buffer.from(array), 1080, 50);
            setImages((oldValue) => [
              ...oldValue,
              {
                image: newFile(
                  imageBuffer,
                  `${Date.now()}.${imageType[1] || 'jpg'}`,
                  file.type
                ),
                priority: oldValue.length + 1,
              },
            ]);
          };
          reader.readAsArrayBuffer(file);
        }
      })
    );
  };

  const openDialog = () => inputRef.current && inputRef.current.click();

  const rotate = async (image: ImageUpdate) => {
    if (image.url) {
      const rotated = await imageRotate(image.url);
      setDeletedImages &&
        setDeletedImages((deletedImages) =>
          deletedImages && image.url
            ? [...deletedImages, image.url]
            : [image.url as string]
        );
      setImages((oldImages) =>
        oldImages.map((oldImage) =>
          oldImage.priority === image.priority
            ? {
                image: newFile(rotated, `${Date.now()}.jpg`, 'image/jpeg'),
                priority: oldImage.priority,
              }
            : oldImage
        )
      );
      if (thumbnail?.priority === image.priority) {
        setThumbnail({
          image: newFile(rotated, `${Date.now()}.jpg`, 'image/jpeg'),
          priority: image.priority,
        });
      }
    } else {
      var reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const array = new Uint8Array(arrayBuffer);
        const rotated = await imageRotate(Buffer.from(array));

        setImages((oldImages) =>
          oldImages.map((oldImage) =>
            oldImage.priority === image.priority
              ? {
                  image: newFile(rotated, image.image.name, image.image.type),
                  priority: oldImage.priority,
                }
              : oldImage
          )
        );
        if (thumbnail?.priority === image.priority) {
          setThumbnail({
            image: newFile(rotated, image.image.name, image.image.type),
            priority: image.priority,
          });
        }
      };
      reader.readAsArrayBuffer(image.image);
    }
  };

  const deleteImage = async (item: ImageUpdate) => {
    setNumOfImages((num) => --num);

    if (item.url) {
      setDeletedImages &&
        setDeletedImages((oldValue) => {
          if (oldValue) {
            return item.url ? [...oldValue, item.url] : oldValue;
          }
          return item.url ? [item.url] : undefined;
        });
    }
    if (thumbnail && item.priority < thumbnail?.priority) {
      setThumbnail(
        (oldThumbnail) =>
          oldThumbnail && {
            ...oldThumbnail,
            priority: oldThumbnail?.priority - 1,
          }
      );
    }
    if (item.priority === thumbnail?.priority && images.length > 1) {
      const image = item.priority === 1 ? images[1].image : images[0].image;
      const url = item.priority === 1 ? images[1].url : images[0].url;

      await _setThumbnail({ url, image, priority: 1 });
    } else if (images.length === 1) {
      setThumbnail(undefined);
    }
    setImages((oldImages) =>
      oldImages
        .filter((image) => image.priority !== item.priority)
        .map((image, key) => ({ ...image, priority: key + 1 }))
    );
  };

  const _setThumbnail = async (image: ImageUpdate) => {
    if (image.url) {
      const thumbnailBuffer = await imageResize(image.url, 400, 50);
      setThumbnail({
        image: newFile(thumbnailBuffer, `${Date.now()}.jpg`, 'image/jpeg'),
        priority: image.priority,
      });
    } else {
      var reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const array = new Uint8Array(arrayBuffer);
        const thumbnailBuffer = await imageResize(Buffer.from(array), 400, 50);
        setThumbnail({
          image: newFile(thumbnailBuffer, image.image.name, image.image.type),
          priority: image.priority,
        });
      };
      reader.readAsArrayBuffer(image.image);
    }
  };

  return progress ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
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
        onChange={handleChange}
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
          {images.map((image, key) => (
            <PreviewImage
              isThumbnail={thumbnail?.priority === image.priority}
              image={previewImages[key]}
              key={key}
              deleteImage={() => deleteImage(image)}
              setThumbnail={() => _setThumbnail(image)}
              rotate={() => rotate(image)}
            />
          ))}
          {images.length < MAX_IMAGES_NUM && (
            <Pressable style={styles.addImage} onPress={openDialog}>
              <Icon name="plus-circle" color={Color.errorColor} size={24} />
            </Pressable>
          )}
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
