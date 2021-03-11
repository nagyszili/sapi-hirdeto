import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import useColorScheme from '../hooks/useColorScheme';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AdDetailsScreen } from '../screens/ad-details/AdDetailsScreen';
import { AdsScreen } from '../screens/ads/AdsScreen';
import { CreateAdScreen } from '../screens/create-ad/CreateAdScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { Icon } from '../utils/icons';
import Colors from '../utils/theme/themes';
import {
  BottomTabParamList,
  HomeParamList,
  ProfileParamList,
  CreateAdParamList,
} from './types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="CreateAd"
        component={CreateAdNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="plus-circle" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <Icon name="my-profile" color={color} />,
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
        options={{ headerTitle: 'Home' }}
      />
      <HomeStack.Screen
        name="AdsScreen"
        component={AdsScreen}
        options={{ headerBackTitle: 'Back', title: 'Ads' }}
      />
      <HomeStack.Screen
        name="AdDetailsScreen"
        component={AdDetailsScreen}
        options={{
          headerBackTitle: 'Back',
          headerTitle: 'AdDetailsScreen',
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
        options={{ headerTitle: 'Profile' }}
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
        options={{ headerTitle: 'Create Ad' }}
      />
    </CreateAdStack.Navigator>
  );
}
