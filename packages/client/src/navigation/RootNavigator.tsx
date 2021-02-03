import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import { AdsScreen } from '../screens/ads/AdsScreen';
import BottomTabNavigator from './BottomTabNavigator';

const RootStack = createStackNavigator();

export const RootNavigator: React.FC<{}> = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <RootStack.Screen
        name="AdsScreen"
        component={AdsScreen}
        options={{ headerBackTitle: 'Back', title: 'Ads' }}
      />
    </RootStack.Navigator>
  );
};
