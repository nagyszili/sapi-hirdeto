import { ReactNativeFile } from 'apollo-upload-client';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as mime from 'react-native-mime-types';

import { AdImageInput } from '../apollo/types/graphql-global-types';

interface Props {
  setImages: React.Dispatch<React.SetStateAction<AdImageInput[]>>;
}
const generateRNFile = (uri: string, name: string) => {
  const mimeType: string = mime.lookup(uri).split('/');
  const type = mimeType[1] ? mimeType[1] : 'image';
  return uri
    ? new ReactNativeFile({
        uri,
        type,
        name: name + `.${type}`,
      })
    : null;
};

export const ImagePickerComponent: React.FC<Props> = ({ setImages }) => {
  const [image, setImage] = useState('');

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

  const uploadImage = async (uri: string) => {
    const image = generateRNFile(uri, `${Date.now()}`);
    if (image) {
      setImages((oldValue) => [...oldValue, { isThumbnail: true, image }]);
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
      setImage(result.uri);
      uploadImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image.length > 0 && (
        <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />
      )}
    </View>
  );
};
