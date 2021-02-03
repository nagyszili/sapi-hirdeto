import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';

export const Fetching: React.FC<{}> = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};
