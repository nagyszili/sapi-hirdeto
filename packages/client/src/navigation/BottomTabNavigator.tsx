import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { HomeHeader } from '../components/Header/HomeHeader';
import { Text } from '../components/themed/Text';
import useColorScheme from '../hooks/useColorScheme';
import { AdsScreen } from '../screens/ads/AdsScreen';
import { CreateAdScreen } from '../screens/create-ad/CreateAdScreen';
import { FavoritesScreen } from '../screens/favorites/FavoritesScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MyAdsScreen } from '../screens/my-ads/MyAdsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { Icon } from '../utils/icons';
import { blackColor, whiteColor, primaryColor } from '../utils/theme/colors';
import Colors from '../utils/theme/themes';
import {
  BottomTabParamList,
  HomeParamList,
  ProfileParamList,
  CreateAdParamList,
  FavoritesParamList,
  MyAdsParamList,
} from './types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
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
            <Icon name="home" color={focused ? primaryColor : blackColor} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.label}>
              Főoldal
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
              color={focused ? primaryColor : blackColor}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.label}>
              Kedvencek
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
            <Icon name="file" color={focused ? primaryColor : blackColor} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.label}>
              Hirdetéseim
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
              color={focused ? primaryColor : blackColor}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.activeLabel : styles.label}>
              Profil
            </Text>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: () => <HomeHeader /> }}
      />
      <HomeStack.Screen
        name="AdsScreen"
        component={AdsScreen}
        options={{
          header: () => <HomeHeader />,
        }}
      />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: 'Profil' }}
      />
    </ProfileStack.Navigator>
  );
}

const CreateAdStack = createStackNavigator<CreateAdParamList>();

function CreateAdNavigator() {
  return (
    <CreateAdStack.Navigator>
      <CreateAdStack.Screen
        name="CreateAd"
        component={CreateAdScreen}
        options={{ headerShown: false }}
      />
    </CreateAdStack.Navigator>
  );
}

const FavoritesStack = createStackNavigator<FavoritesParamList>();

function FavoritesNavigator() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ headerTitle: 'Kedvencek' }}
      />
    </FavoritesStack.Navigator>
  );
}

const MyAdsStack = createStackNavigator<MyAdsParamList>();

function MyAdsNavigator() {
  return (
    <MyAdsStack.Navigator>
      <MyAdsStack.Screen
        name="MyAds"
        component={MyAdsScreen}
        options={{ headerTitle: 'Sajat hirdeteseim' }}
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
    color: primaryColor,
  },
  createAdIconActive: {
    borderRadius: 100,
    backgroundColor: primaryColor,
    padding: 5,
  },
});
