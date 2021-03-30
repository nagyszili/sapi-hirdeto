import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { client } from './src/apollo/client';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

const App: React.FC<{}> = () => {
  const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();
  const colorScheme = 'light';

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {Platform.OS === 'ios' && (
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      )}
      <ApolloProvider client={client}>
        <Navigation colorScheme={colorScheme} />
      </ApolloProvider>
    </SafeAreaProvider>
  );
};

export default App;
