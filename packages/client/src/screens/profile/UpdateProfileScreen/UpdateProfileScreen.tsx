import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { useCurrentUser } from '../../../apollo/user/useCurrentUser';
import { useUpdateCurrentUser } from '../../../apollo/user/useUpdateCurrentUser';
import { Fetching } from '../../../components/Fetching';
import { UploadProfilePicture } from '../../../components/ImageUpload/UploadProfilePicture/UploadProfilePicture';
import { TextInput } from '../../../components/TextInput/TextInput';
import { HoverText } from '../../../components/themed/HoverText';
import { Text } from '../../../components/themed/Text';
import { getErrorMessage } from '../../../utils/errors';
import * as Color from '../../../utils/theme/colors';
import { emailErrorMessage } from '../../../utils/validators';

export const UpdateProfileScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { data: user, loading } = useCurrentUser();
  const [updateUser] = useUpdateCurrentUser();
  const [profilePic, setProfilePic] = React.useState<any>(
    user?.currentUser.profilePictureUrl
  );
  const emailRef = useRef<any>();
  const nameRef = useRef<any>();
  const phoneNumberRef = useRef<any>();

  React.useEffect(() => {
    user?.currentUser && setProfilePic(user.currentUser.profilePictureUrl);
  }, [user]);

  const save = async () => {
    const email = emailRef.current.getValue();
    const name = nameRef.current.getValue();
    const phoneNumber = phoneNumberRef.current.getValue();
    if (email) {
      try {
        await updateUser({
          variables: {
            email,
            name,
            phoneNumber,
            ...(typeof profilePic === 'string'
              ? undefined
              : { profilePicture: profilePic }),
          },
        });
      } catch (error) {
        emailRef.current.showError(getErrorMessage(error));
      }
      navigation.navigate('Profile', { screen: 'ProfileScreen' });
    } else {
      emailRef.current.showError();
      nameRef.current.showError();
      phoneNumberRef.current.showError();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: () => (
        <Text style={styles.headerTitle} black semiBold>
          {texts['profile']}
        </Text>
      ),
      headerLeft: () => (
        <HoverText
          style={styles.headerLeftText}
          onPress={() =>
            navigation.navigate('Profile', { screen: 'ProfileScreen' })
          }
        >
          {texts['cancel']}
        </HoverText>
      ),
      headerRight: () => (
        <HoverText style={styles.headerRightText} onPress={() => save()}>
          {texts['save']}
        </HoverText>
      ),
    });
  });

  if (loading || !user?.currentUser) {
    return <Fetching />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.groupContainer}>
        <Text style={styles.title} semiBold>
          {texts['generalInfo']}
        </Text>

        <View style={styles.row}>
          <Text style={styles.label} regular greyDark>
            {texts['emailAddress']}
          </Text>
          <TextInput
            initialValue={user?.currentUser.email}
            ref={emailRef}
            errorMessage={emailErrorMessage}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label} regular greyDark>
            {texts['name']}
          </Text>
          <TextInput
            placeholder={texts['fullName']}
            initialValue={user?.currentUser.name}
            placeholderTextColor="#969696b3"
            ref={nameRef}
            maxLength={40}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label} regular greyDark>
            {texts['phoneNumber']}
          </Text>
          <TextInput
            placeholder="074xxxxxxx"
            initialValue={user?.currentUser.phoneNumber}
            placeholderTextColor="#969696b3"
            ref={phoneNumberRef}
            keyboardType="numeric"
            isNumberInput
          />
        </View>
      </View>

      <View style={styles.groupContainer}>
        <Text style={styles.title} semiBold>
          {texts['profilePicture']}
        </Text>
        <UploadProfilePicture
          profilePic={profilePic}
          setProfilePic={setProfilePic}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    marginVertical: 6,
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    padding: 20,
  },
  title: {
    fontSize: 17,
    marginTop: 5,
    marginBottom: 32,
  },
  label: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginBottom: 7,
  },
  row: {
    marginBottom: 24,
  },
  textInput: {
    height: 46,
    borderColor: Color.greyColor,
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 24,
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
  headerRightText: {
    marginRight: 20,
    fontSize: 16,
    color: Color.primaryColor,
  },
  headerLeftText: {
    marginLeft: 20,
    fontSize: 16,
    color: Color.greyDarkColor,
  },
  headerTitle: {
    fontSize: 22,
  },
});
