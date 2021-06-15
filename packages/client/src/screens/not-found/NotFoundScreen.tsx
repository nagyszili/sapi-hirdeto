import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';

import { Text } from '../../components/themed/Text';

export const NotFoundScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <Pressable
        onPress={() =>
          navigation.navigate('Main', {
            screen: 'Home',
            params: { screen: 'HomeScreen' },
          })
        }
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
