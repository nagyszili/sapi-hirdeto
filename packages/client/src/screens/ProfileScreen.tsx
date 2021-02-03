import * as React from 'react';
import { StyleSheet, View, SafeAreaView, Button } from 'react-native';

export const ProfileScreen: React.FC<{}> = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button onPress={() => {}} title="Login" />
        <Button onPress={() => {}} title="Register" />
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
