import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { Header } from '../components/Header/Header.web';
import NotFoundScreen from '../screens/NotFoundScreen';
import { AdDetailsScreen } from '../screens/ad-details/AdDetailsScreen';
import { AdsScreen } from '../screens/ads/AdsScreen';
import { CreateAdScreen } from '../screens/create-ad/CreateAdScreen';
import { HomeScreen } from '../screens/home/HomeScreen';

const RootStack = createStackNavigator();

export const RootNavigator: React.FC<{}> = (props: any) => {
  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        header: () => <Header />,
      }}
      {...props}
    >
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
      <RootStack.Screen name="AdsScreen" component={AdsScreen} />
      <RootStack.Screen name="AdDetailsScreen" component={AdDetailsScreen} />
      <RootStack.Screen name="CreateAdScreen" component={CreateAdScreen} />
      <RootStack.Screen name="NotFound" component={NotFoundScreen} />
    </RootStack.Navigator>
  );
};
