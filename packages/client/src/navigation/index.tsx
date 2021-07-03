import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import pageNames from '../../assets/texts/pageNames.json';
import { useLinkingConfig } from './LinkingConfiguration/useLinkingConfig';
import { RootNavigator } from './RootNavigator';
import { UIStateContainer } from './UIStateContainer';
import { navigationRef } from './navigation';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const linkingConfig = useLinkingConfig();
  const linking = {
    prefixes: ['https://nagyszili.github.io/sapi-hirdeto/, client://'],
    config: linkingConfig,
  };

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
          } - Sapi-Hirdető`,
      }}
      // @ts-ignore
      ref={navigationRef}
    >
      <UIStateContainer />
      <RootNavigator />
    </NavigationContainer>
  );
}
