import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { HeaderBackButton } from '../../components/Buttons/HeaderBackButton';
import { HomeHeader } from '../../components/Headers/HomeHeader';
import { Text } from '../../components/themed/Text';
import useColorScheme from '../../hooks/useColorScheme';
import { AdminScreen } from '../../screens/admin-panel/AdminScreen';
import { AdsScreen } from '../../screens/ads/AdsScreen';
import { CreateAdScreen } from '../../screens/create-ad/CreateAdScreen';
import { FavoritesScreen } from '../../screens/favorites/FavoritesScreen';
import { HomeScreen } from '../../screens/home/HomeScreen';
import { MyAdsScreen } from '../../screens/my-ads/MyAdsScreen';
import { ProfileScreen } from '../../screens/profile/ProfileScreen';
import { UpdateProfileScreen } from '../../screens/profile/UpdateProfileScreen';
import { Icon } from '../../utils/icons';
import {
  blackColor,
  whiteColor,
  secondaryColor,
} from '../../utils/theme/colors';
import Colors from '../../utils/theme/themes';

const BottomTab = createBottomTabNavigator();

export function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: {
          paddingVertical: 0,
          backgroundColor: whiteColor,
        },
        tabStyle: {
          padding: 5,
        },
        activeTintColor: Colors[colorScheme].tint,
        showLabel: true,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="home" color={focused ? secondaryColor : blackColor} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.label}>
              {texts['mainPage']}
            </Text>
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="star-empty"
              color={focused ? secondaryColor : blackColor}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.label}>
              {texts['favorites']}
            </Text>
          ),
        }}
      />
      <BottomTab.Screen
        name="CreateAd"
        component={CreateAdNavigator}
        options={{
          tabBarIcon: () => (
            <View style={styles.createAdIconActive}>
              <Icon name="plus" size={28} color={whiteColor} />
            </View>
          ),
          tabBarLabel: () => <View />,
        }}
      />
      <BottomTab.Screen
        name="MyAds"
        component={MyAdsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name="file" color={focused ? secondaryColor : blackColor} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.label}>
              {texts['myAdsBottomLabel']}
            </Text>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="my-profile"
              color={focused ? secondaryColor : blackColor}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.label}>
              {texts['profile']}
            </Text>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator headerMode="screen">
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: (props) => {
            return <HomeHeader topNotchSize={props.insets.top} />;
          },
        }}
      />
      <HomeStack.Screen name="AdsScreen" component={AdsScreen} />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator headerMode="screen">
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
      />
      <ProfileStack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{
          headerLeft: () => <HeaderBackButton />,
          headerTintColor: 'black',
        }}
      />
    </ProfileStack.Navigator>
  );
}

const CreateAdStack = createStackNavigator();

function CreateAdNavigator() {
  return (
    <CreateAdStack.Navigator headerMode="screen">
      <CreateAdStack.Screen
        name="CreateAdScreen"
        component={CreateAdScreen}
        options={{ headerShown: false }}
      />
    </CreateAdStack.Navigator>
  );
}

const FavoritesStack = createStackNavigator();

function FavoritesNavigator() {
  return (
    <FavoritesStack.Navigator headerMode="screen">
      <FavoritesStack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          headerTitle: () => (
            <Text style={{ fontSize: 22 }} black semiBold>
              {texts['favorites']}
            </Text>
          ),
          headerTitleAlign: 'center',
        }}
      />
    </FavoritesStack.Navigator>
  );
}

const MyAdsStack = createStackNavigator();

function MyAdsNavigator() {
  return (
    <MyAdsStack.Navigator headerMode="screen">
      <MyAdsStack.Screen
        name="MyAdsScreen"
        component={MyAdsScreen}
        options={{
          headerTitle: () => (
            <Text style={{ fontSize: 22 }} black semiBold>
              {texts['myAds']}
            </Text>
          ),
          headerTitleAlign: 'center',
        }}
      />
    </MyAdsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    color: blackColor,
  },
  activeLabel: {
    fontSize: 11,
    color: secondaryColor,
  },
  createAdIconActive: {
    borderRadius: 100,
    backgroundColor: secondaryColor,
    padding: 5,
  },
});
