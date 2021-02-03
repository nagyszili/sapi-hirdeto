import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { AdsScreen } from '../screens/ads/AdsScreen';
import { HomeScreen } from '../screens/home/HomeScreen';

const RootStack = createStackNavigator();

export const RootNavigator: React.FC<{}> = (props: any) => {
  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{ cardStyle: { backgroundColor: 'transparent' } }}
      {...props}
    >
      <RootStack.Screen
        name="Main"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          title: 'Home',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => <Button onPress={() => {}} title="Login" />,
          headerRight: () => <Button onPress={() => {}} title="Register" />,
        })}
      />
      <RootStack.Screen
        name="AdsScreen"
        component={AdsScreen}
        options={{ headerBackTitle: 'Back', title: 'Ads' }}
      />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </RootStack.Navigator>
  );
};
