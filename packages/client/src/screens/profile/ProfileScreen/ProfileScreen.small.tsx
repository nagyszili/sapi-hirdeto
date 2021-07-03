import { useReactiveVar } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { isLoggedInVar } from '../../../apollo/reactiveVariables';
import { logoutUser } from '../../../apollo/user/logoutUser';
import { useCurrentUser } from '../../../apollo/user/useCurrentUser';
import { AttributeLine } from '../../../components/AttributeLine/AttributeLine';
import { Button } from '../../../components/Buttons/Button';
import { Fetching } from '../../../components/Fetching';
import { ProfilePicture } from '../../../components/ImageUpload/ProfilePicture/ProfilePicture';
import { NotLoggedInComponent } from '../../../components/NotLoggedIn/NotLoggedInComponent';
import { HoverText } from '../../../components/themed/HoverText';
import { Text } from '../../../components/themed/Text';
import { ROLES } from '../../../utils/constants';
import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';

export const ProfileScreen: React.FC<{}> = () => {
  const navigation = useNavigation();

  const { data: user, loading } = useCurrentUser();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: () => (
        <Text style={styles.headerTitle} black semiBold>
          {texts['profile']}
        </Text>
      ),
      headerRight: () =>
        isLoggedIn ? (
          <HoverText
            style={styles.headerRightText}
            onPress={() => navigation.navigate('UpdateProfileScreen')}
          >
            {texts['edit']}
          </HoverText>
        ) : null,
    });
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <NotLoggedInComponent />;
  }

  if (loading) {
    return <Fetching />;
  }

  return (
    <View>
      <View style={styles.groupContainer}>
        <Text style={styles.title} semiBold>
          {texts['generalInfo']}
        </Text>
        <AttributeLine
          leftText={texts['emailAddress']}
          rightText={user?.currentUser.email}
          isGrey
          isTop
        />
        <AttributeLine
          leftText={texts['name']}
          rightText={user?.currentUser.name}
          isWhite
        />
        <AttributeLine
          leftText={texts['phoneNumber']}
          rightText={user?.currentUser.phoneNumber || ''}
          isGrey
          isBottom
        />
      </View>

      <View style={styles.groupContainer}>
        <Text style={styles.title} semiBold>
          {texts['profilePicture']}
        </Text>
        {user?.currentUser?.profilePictureUrl ? (
          <ProfilePicture image={user?.currentUser.profilePictureUrl} />
        ) : (
          <Text small greyMedium>
            {texts['noProfilePicture']}
          </Text>
        )}
      </View>
      {user?.currentUser.role === ROLES.MANAGER && (
        <Button
          onPress={() => navigation.navigate('AdminScreen')}
          text="Admin Panel"
          style={styles.adminButton}
        />
      )}
      <Pressable style={styles.button} onPress={() => logoutUser()}>
        <Icon name="logout" size={22} style={styles.buttonIcon} />
        <Text large>{texts.logout}</Text>
      </Pressable>
    </View>
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
    marginBottom: 23,
  },
  headerRightText: {
    marginRight: 20,
    fontSize: 16,
    color: Color.primaryColor,
  },
  headerTitle: {
    fontSize: 22,
  },
  adminButton: {
    marginRight: 300,
  },
  button: {
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    height: 49,
  },
  buttonIcon: {
    marginHorizontal: 25,
  },
});
