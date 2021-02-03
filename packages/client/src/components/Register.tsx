import * as React from 'react';
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';

import { useCreateUserMutation } from '../apollo/user/useCreateUserMutation';

export const Register: React.FC<{}> = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [createUser] = useCreateUserMutation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.inputStyle}
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.inputStyle}
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        title="Submit"
        onPress={() => {
          createUser({ variables: { email, password } });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  inputStyle: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 10,
    minWidth: 250,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderRadius: 6,
  },
  button: {
    padding: 10,
    backgroundColor: 'gray',
  },
  text: {
    color: 'white',
  },
});
