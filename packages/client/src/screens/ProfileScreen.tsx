import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import { HeaderContentComponent } from '../components/Header/HeaderContentComponent';

export const ProfileScreen: React.FC<{}> = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <HeaderContentComponent />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
