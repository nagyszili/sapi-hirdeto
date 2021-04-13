import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import pageNames from '../../assets/texts/pageNames.json';
import { linking } from './LinkingConfiguration';
import { RootNavigator } from './RootNavigator';
import { UIStateContainer } from './UIStateContainer/UIStateContainer';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={linking}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      documentTitle={{
        formatter: (options, route) =>
          `${
            options?.title ??
            pageNames[route?.name as keyof typeof pageNames] ??
            route?.name
          } - Piacter`,
      }}
    >
      <UIStateContainer />
      <RootNavigator />
    </NavigationContainer>
  );
}
