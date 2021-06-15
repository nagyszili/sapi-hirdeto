import { useReactiveVar } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { isLoggedInVar } from '../../../apollo/reactiveVariables';
import { showLoginModal } from '../../../apollo/ui/modalMutations';
import { logoutUser } from '../../../apollo/user/logoutUser';
import { useCurrentUser } from '../../../apollo/user/useCurrentUser';
import { ROLES } from '../../../utils/constants';
import { Icon } from '../../../utils/icons';
import { ImageComponent } from '../../../utils/images';
import * as Color from '../../../utils/theme/colors';
import { maxContentWidth, globalPadding } from '../../../utils/theme/layout';
import { Button } from '../../Buttons/Button';
import { HoverText } from '../../themed/HoverText';
import { Text } from '../../themed/Text';
import { MainHeaderProps } from './MainHeader.props';

export const MainHeader: React.FC<MainHeaderProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data: user } = useCurrentUser();

  return (
    <View style={styles.topHeader}>
      <View style={styles.headerContent}>
        <Pressable
          onPress={() =>
            route.name === 'HomeScreen'
              ? navigation.setParams({ top: true })
              : navigation.navigate('HomeScreen', {
                  location: undefined,
                  top: true,
                })
          }
          style={styles.home}
        >
          <ImageComponent name="piacter" style={styles.logo} />
        </Pressable>
        <View style={styles.authContainer}>
          <HoverText
            black
            style={[
              styles.button,
              route.name === 'FavoritesScreen' && styles.semiBold,
            ]}
            onPress={() => navigation.navigate('FavoritesScreen')}
          >
            {texts['favorites']}
          </HoverText>
          {isLoggedIn ? (
            <>
              {user?.currentUser.role === ROLES.MANAGER && (
                <HoverText
                  black
                  style={[
                    styles.button,
                    route.name === 'AdminScreen' && styles.semiBold,
                  ]}
                  onPress={() => navigation.navigate('AdminScreen')}
                >
                  {texts.adminPanel}
                </HoverText>
              )}
              <HoverText
                black
                style={[
                  styles.button,
                  route.name === 'MyAdsScreen' && styles.semiBold,
                ]}
                onPress={() => navigation.navigate('MyAdsScreen')}
              >
                {texts['myAds']}
              </HoverText>
              <HoverText
                black
                style={[
                  styles.button,
                  route.name === 'ProfileScreen' && styles.semiBold,
                ]}
                onPress={() => navigation.navigate('ProfileScreen')}
              >
                {texts['profile']}
              </HoverText>
              <HoverText
                black
                style={styles.button}
                onPress={() => logoutUser()}
              >
                {texts['logout']}
              </HoverText>
            </>
          ) : (
            <>
              <HoverText
                black
                semiBold
                style={styles.button}
                onPress={() => showLoginModal()}
              >
                {texts['login']}
              </HoverText>
              <HoverText
                black
                semiBold
                style={styles.button}
                onPress={() => showLoginModal({ isRegister: true })}
              >
                {texts['registration']}
              </HoverText>
            </>
          )}
          <Button
            style={styles.button}
            onPress={() => {
              navigation.navigate('CreateAdScreen');
            }}
          >
            <View style={styles.newAd}>
              <Icon
                name="plus"
                color={Color.whiteColor}
                size={16}
                style={styles.plusIcon}
              />
              <Text style={styles.text} white semiBold>
                {texts['newAd']}
              </Text>
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    maxWidth: maxContentWidth,
    paddingHorizontal: globalPadding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    backgroundColor: Color.whiteColor,
    borderBottomColor: Color.fakeShadowColor,
    borderBottomWidth: 1,
  },
  button: {
    marginLeft: 24,
    padding: 10,
  },
  semiBold: {
    fontWeight: '600',
  },
  text: {
    lineHeight: 22,
  },
  newAd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    marginRight: 8,
  },
  logo: {
    height: 50,
    width: 130,
    marginLeft: -10,
  },
});
