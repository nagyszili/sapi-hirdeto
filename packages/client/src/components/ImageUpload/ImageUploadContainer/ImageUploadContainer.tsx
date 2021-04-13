import { ReactNativeFile } from 'apollo-upload-client';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, Platform, FlatList } from 'react-native';
import * as mime from 'react-native-mime-types';

import texts from '../../../../assets/texts/texts.json';
import { ImageInput } from '../../../apollo/types/graphql-global-types';
import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';
import { Text } from '../../themed/Text';
import { PreviewImage } from '../PreviewImage/PreviewImage';
import { ImageUploadContainerProps } from './ImageUploadContainer.props';

export const ImageUploadContainer: React.FC<ImageUploadContainerProps> = ({
  images,
  setImages,
}) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const generateRNFile = (uri: string, name: string) => {
    const mimeType: string = mime.lookup(uri).split('/');
    const type = `image/${mimeType[1] || '*'}`;
    return uri
      ? new ReactNativeFile({
          uri,
          type,
          name: name + `.${type}`,
        })
      : null;
  };

  const uploadImage = (uri: string) => {
    const image = generateRNFile(uri, `${Date.now()}`);
    if (image) {
      setImages((oldValue) => [
        ...oldValue,
        {
          isThumbnail: oldValue.length === 0,
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

  const deleteImage = (key: number) =>
    setImages((oldImages) =>
      oldImages
        .filter((_, index) => index !== key)
        .map((image, key) =>
          key === 0 ? { ...image, isThumbnail: true } : image
        )
    );

  const renderItem = (item: ImageInput, index: number) => {
    return (
      <PreviewImage
        isThumbnail={index === 0}
        image={item.image.uri}
        key={index}
        deleteImage={() => deleteImage(index)}
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
          keyExtractor={(item, index) => item.image.uri + index}
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
