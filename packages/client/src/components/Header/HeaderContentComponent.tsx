import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Pressable, Platform } from 'react-native';

import { showLoginModal } from '../../apollo/ui/modalMutations';
import { logoutUser } from '../../apollo/user/logoutUser';
import { useIsLoggedInQuery } from '../../apollo/user/useIsUserLoggedIn';
import { Text } from '../themed/Text';

export const HeaderContentComponent: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { data: isLoggedInQuery } = useIsLoggedInQuery();

  return isLoggedInQuery && isLoggedInQuery.isLoggedIn ? (
    <View style={styles.container}>
      {Platform.OS === 'web' && (
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('CreateAdScreen');
          }}
        >
          <Text style={styles.buttonText}>CREATE AD</Text>
        </Pressable>
      )}
      <Pressable style={styles.button} onPress={() => logoutUser()}>
        <Text style={styles.buttonText}>LOGOUT</Text>
      </Pressable>
    </View>
  ) : (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => showLoginModal()}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => showLoginModal({ isRegister: true })}
      >
        <Text style={styles.buttonText}>REGISTER</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    margin: 5,
    padding: 10,
    backgroundColor: '#2196f3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
