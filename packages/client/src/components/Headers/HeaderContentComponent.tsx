import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { isLoggedInVar } from '../../apollo/reactiveVariables';
import { showLoginModal } from '../../apollo/ui/modalMutations';
import { logoutUser } from '../../apollo/user/logoutUser';
import { Text } from '../themed/Text';

export const HeaderContentComponent: React.FC<{}> = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return isLoggedIn ? (
    <View style={styles.container}>
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
