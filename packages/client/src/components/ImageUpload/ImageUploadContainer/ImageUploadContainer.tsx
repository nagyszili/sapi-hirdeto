import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, Platform, FlatList } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { ImageUpdate } from '../../../apollo/types/graphql-global-types';
import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';
import { Text } from '../../themed/Text';
import { PreviewImage } from '../PreviewImage/PreviewImage';
import { generateRNFile } from '../imageUtils';
import { ImageUploadContainerProps } from './ImageUploadContainer.props';

export const ImageUploadContainer: React.FC<ImageUploadContainerProps> = ({
  images,
  setImages,
  setThumbnail,
  thumbnail,
  setDeletedImages,
}) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const uploadImage = async (uri: string) => {
    const image = await resizeImage(uri, `${Date.now()}`, 1080);

    if (!thumbnail) {
      const resizedThumbnail = await resizeImage(uri, `${Date.now()}`, 400);
      setThumbnail({ image: resizedThumbnail, priority: 1 });
    }

    if (image) {
      setImages((oldValue) => [
        ...oldValue,
        {
          image,
          priority: oldValue.length + 1,
        },
      ]);
    } else {
      alert('Invalid file selected');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.cancelled) {
      uploadImage(result.uri);
    }
  };

  const rotate = async (image: ImageUpdate) => {
    if (image.url) {
      const result = await ImageManipulator.manipulateAsync(image.url, [
        { rotate: -90 },
      ]);
      const rotated = generateRNFile(result.uri, `${Date.now()}.jpg`);
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
                image: rotated,
                priority: oldImage.priority,
              }
            : oldImage
        )
      );
      if (thumbnail?.priority === image.priority) {
        const resizedThumbnail = await resizeImage(
          rotated.uri,
          `${Date.now()}`,
          400
        );
        setThumbnail({
          image: resizedThumbnail,
          priority: image.priority,
        });
      }
    } else {
      const rotated = await ImageManipulator.manipulateAsync(image.image.uri, [
        { rotate: -90 },
      ]);
      setImages((oldImages) =>
        oldImages.map((oldImage) =>
          oldImage.priority === image.priority
            ? {
                image: generateRNFile(rotated.uri, image.image.name),
                priority: oldImage.priority,
              }
            : oldImage
        )
      );
      if (thumbnail?.priority === image.priority) {
        const resizedThumbnail = await resizeImage(
          rotated.uri,
          image.image.name,
          400
        );
        setThumbnail({
          image: resizedThumbnail,
          priority: image.priority,
        });
      }
    }
  };

  const resizeImage = async (uri: string, name: string, width: number) => {
    const resizedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    const image = generateRNFile(resizedImage.uri, name);
    return image;
  };

  const deleteImage = async (item: ImageUpdate) => {
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

      const resizedThumbnail = await resizeImage(
        image?.uri || url,
        `${Date.now()}`,
        400
      );
      setThumbnail({
        image: resizedThumbnail,
        priority: 1,
      });
    } else if (images.length === 1) {
      setThumbnail(undefined);
    }
    setImages((oldImages) =>
      oldImages
        .filter((image) => image.priority !== item.priority)
        .map((image, key) => ({ ...image, priority: key + 1 }))
    );
  };

  const renderItem = (item: ImageUpdate, index: number) => {
    return (
      <PreviewImage
        isThumbnail={thumbnail?.priority === item.priority}
        image={item?.image?.uri || item.url}
        key={index}
        setThumbnail={() => setThumbnail(item)}
        deleteImage={() => deleteImage(item)}
        rotate={() => rotate(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {images.length > 0 && (
        <FlatList
          style={{ width: '100%', marginBottom: 22 }}
          showsHorizontalScrollIndicator={false}
          data={images}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) =>
            (item?.image?.uri || item?.url) + index
          }
          horizontal
        />
      )}

      <Pressable style={styles.addPhoto} onPress={pickImage}>
        <Icon name="plus-circle" color={Color.errorColor} />
        <Text style={styles.addPhotoText} greyDark>
          {texts['addPhotos']}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.whiteColor,
    alignItems: 'center',
  },
  addPhoto: {
    borderRadius: 6,
    backgroundColor: Color.primaryLighterColor,
    width: '100%',
    height: 46,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    color: Color.errorColor,
    fontSize: 15,
    marginLeft: 8,
  },
});
