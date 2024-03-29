import { createStackNavigator } from '@react-navigation/stack';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import * as React from 'react';

import { HeaderBackButton } from '../../components/Buttons/HeaderBackButton';
import { FullScreenMultiSelect } from '../../components/Filters/FullScreenMultiSelect/FullScreenMultiSelect';
import { FullScreenSelect } from '../../components/Filters/FullScreenSelect/FullScreenSelect';
import { AdDetailsScreen } from '../../screens/ad-details/AdDetailsScreen';
import { FiltersScreen } from '../../screens/filters/FiltersScreen';
import { NotFoundScreen } from '../../screens/not-found/NotFoundScreen';
import { UpdateAdScreen } from '../../screens/update-ad/UpdateAdScreen';
import { BottomTabNavigator } from '../BottomTabNavigator';

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
        name="FullScreenSelect"
        component={FullScreenSelect}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => <HeaderBackButton />,
          transitionSpec: {
            open: transitionConfig,
            close: transitionConfig,
          },
        }}
      />
      <RootStack.Screen
        name="FullScreenMultiSelect"
        component={FullScreenMultiSelect}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => <HeaderBackButton />,
          transitionSpec: {
            open: transitionConfig,
            close: transitionConfig,
          },
        }}
      />
      <RootStack.Screen
        name="FiltersScreen"
        component={FiltersScreen}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => <HeaderBackButton />,
          transitionSpec: {
            open: transitionConfig,
            close: transitionConfig,
          },
        }}
      />
      <RootStack.Screen
        name="AdDetailsScreen"
        component={AdDetailsScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="UpdateAdScreen"
        component={UpdateAdScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

const transitionConfig: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
