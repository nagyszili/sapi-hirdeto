import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable, Platform } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { Icon } from '../../../utils/icons';
import { ImageComponent } from '../../../utils/images';
import * as Color from '../../../utils/theme/colors';
import { Text } from '../../themed/Text';
import { ProfilePicture } from '../ProfilePicture/ProfilePicture';
import { generateRNFile } from '../imageUtils';
import { UploadProfilePictureProps } from './UploadProfilePicture.props';

export const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({
  profilePic,
  setProfilePic,
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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const image = await resizeImage(uri, `${Date.now()}`, 250);

    if (image) {
      setProfilePic(image);
    } else {
      alert('Invalid file selected');
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

  return (
    <View style={styles.container}>
      {profilePic ? (
        <View style={styles.imagesContainer}>
          <ProfilePicture
            image={
              typeof profilePic === 'string' ? profilePic : profilePic?.uri
            }
          />
        </View>
      ) : (
        <View style={styles.imagesContainer}>
          <ImageComponent
            name="profilePicPlaceholder"
            style={styles.imageUpload}
          />
        </View>
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
  imagesContainer: {
    paddingBottom: 27,
  },
  imageUpload: {
    width: 150,
    height: 150,
    borderRadius: 80,
    borderColor: Color.greyColor,
    borderWidth: 1,
  },
});
