import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { useRef, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { isLoggedInVar } from '../../../apollo/reactiveVariables';
import { useCurrentUser } from '../../../apollo/user/useCurrentUser';
import { useUpdateCurrentUser } from '../../../apollo/user/useUpdateCurrentUser';
import { Button } from '../../../components/Buttons/Button';
import { Fetching } from '../../../components/Fetching';
import { Footer } from '../../../components/Footer/Footer.web';
import { GradientHeader } from '../../../components/Headers/GradientHeader.web';
import { UploadProfilePicture } from '../../../components/ImageUpload/UploadProfilePicture/UploadProfilePicture';
import { NotLoggedInComponent } from '../../../components/NotLoggedIn';
import { TextInput } from '../../../components/TextInput/TextInput';
import { HoverText } from '../../../components/themed/HoverText';
import { Text } from '../../../components/themed/Text';
import { getErrorMessage } from '../../../utils/errors';
import * as Color from '../../../utils/theme/colors';
import { maxContentWidth, globalPadding } from '../../../utils/theme/layout';
import { emailErrorMessage } from '../../../utils/validators';

export const ProfileScreen: React.FC<{}> = () => {
  const { data: user, loading } = useCurrentUser();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const [updateUser] = useUpdateCurrentUser();
  const [profilePic, setProfilePic] = useState<any>(
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
    } else {
      emailRef.current.showError();
      nameRef.current.showError();
      phoneNumberRef.current.showError();
    }
  };

  if (!isLoggedIn) {
    return <NotLoggedInComponent />;
  }

  if (loading || !user?.currentUser) {
    return <Fetching />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
    >
      <GradientHeader />

      <View style={styles.content}>
        <Text style={styles.title} black semiBold>
          {texts['profile']}
        </Text>
        <View style={styles.topContainers}>
          <View style={styles.generalInfoContainer}>
            <Text style={styles.generalInfoTitle} large black semiBold>
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
                editable={user?.currentUser.loginType === 'password'}
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
          <View style={styles.photosContainer}>
            <Text style={styles.photosTitle} large black semiBold>
              {texts['profilePicture']}
            </Text>
            <UploadProfilePicture
              setProfilePic={setProfilePic}
              profilePic={profilePic}
            />
          </View>
        </View>
        <View style={styles.submitContainer}>
          <HoverText
            style={styles.cancel}
            onPress={() => {}}
            black
            small
            semiBold
          >
            {texts['cancel']}
          </HoverText>
          <Button
            style={styles.button}
            textStyle={{ fontWeight: '600' }}
            text={texts['save']}
            onPress={save}
          />
        </View>
      </View>
      <View style={{ width: '100%' }}>
        <Footer />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
  },
  content: {
    maxWidth: maxContentWidth,
    paddingHorizontal: globalPadding,
    width: '100%',
    height: '100%',
    flex: 1,
    marginVertical: 56,
  },
  title: {
    fontSize: 28,
    marginBottom: 35,
  },
  topContainers: {
    flexDirection: 'row',
  },
  generalInfoContainer: {
    flex: 1,
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    marginBottom: 12,
    paddingHorizontal: 33,
    paddingTop: 35,
    paddingBottom: 55,
  },
  photosContainer: {
    flex: 1,
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    paddingHorizontal: 33,
    paddingTop: 35,
    paddingBottom: 32,
    marginLeft: 12,
    marginBottom: 12,
  },
  generalInfoTitle: {
    marginBottom: 32,
  },
  photosTitle: {
    marginBottom: 23,
  },
  submitContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    marginTop: 12,
    marginBottom: 40,
    paddingHorizontal: 32,
    paddingVertical: 19,
  },
  button: {
    margin: 0,
    width: 152,
    height: 38,
  },
  cancel: {
    marginRight: 33,
  },
  label: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginBottom: 7,
  },
  row: {
    marginBottom: 24,
    width: '60%',
    minWidth: 300,
  },
});
