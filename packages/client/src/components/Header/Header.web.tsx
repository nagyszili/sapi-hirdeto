import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { showLoginModal } from '../../apollo/ui/modalMutations';
import { logoutUser } from '../../apollo/user/logoutUser';
import { useIsLoggedInQuery } from '../../apollo/user/useIsUserLoggedIn';
import { Icon } from '../../utils/icons';
import { ImageComponent } from '../../utils/images';
import {
  whiteColor,
  primaryColor,
  secondaryColor,
} from '../../utils/theme/colors';
import { maxContentWidth } from '../../utils/theme/layout';
import { Button } from '../Buttons/Button';
import { HoverText } from '../themed/HoverText';
import { Text } from '../themed/Text';

export const Header: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { data: isLoggedInQuery } = useIsLoggedInQuery();

  return (
    <View>
      <View style={styles.topHeader}>
        <View style={styles.headerContent}>
          <Pressable
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
            style={styles.home}
          >
            <ImageComponent name="piacter" style={styles.logo} />
          </Pressable>
          <View style={styles.authContainer}>
            {isLoggedInQuery && isLoggedInQuery.isLoggedIn ? (
              <>
                <HoverText
                  black
                  semiBold
                  style={styles.button}
                  onPress={() => logoutUser()}
                >
                  {texts['logout']}
                </HoverText>
                <Button
                  onPress={() => {
                    navigation.navigate('CreateAdScreen');
                  }}
                >
                  <View style={styles.newAd}>
                    <Icon
                      name="plus"
                      color={whiteColor}
                      size={16}
                      style={styles.plusIcon}
                    />
                    <Text style={styles.text} white semiBold>
                      {texts['newAd']}
                    </Text>
                  </View>
                </Button>
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
          </View>
        </View>
      </View>
      <LinearGradient
        colors={[secondaryColor, primaryColor]}
        style={styles.categoryHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.categoryContent}>
          <View style={styles.categoryButton}>
            <HoverText
              medium
              white
              semiBold
              textHoverStyle={styles.categoryHover}
              onPress={() => {}}
            >
              {texts['property']}
            </HoverText>
          </View>

          <View style={styles.categoryButton}>
            <HoverText
              medium
              white
              semiBold
              textHoverStyle={styles.categoryHover}
              onPress={() => {}}
            >
              {texts['vehicle']}
            </HoverText>
          </View>

          <View style={styles.categoryButton}>
            <HoverText
              medium
              white
              semiBold
              textHoverStyle={styles.categoryHover}
              onPress={() => {}}
            >
              {texts['agriculture']}
            </HoverText>
          </View>
        </View>
      </LinearGradient>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryContent: {
    flex: 1,
    maxWidth: maxContentWidth,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  categoryButton: {
    marginRight: 34,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
    backgroundColor: whiteColor,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  categoryHover: {
    opacity: 0.75,
  },
  button: {
    margin: 5,
    padding: 10,
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
