import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

import { useCreateUserMutation } from '../apollo/user/useCreateUserMutation';
import { Text, View } from '../components/Themed';

export const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [createUser] = useCreateUserMutation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        title="Submit"
        onPress={() => {
          console.log(email);
          console.log(password);

          createUser({ variables: { email, password } });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  inputStyle: {
    marginVertical: 5,
    marginHorizontal: 10,
    minWidth: 400,
    height: 60,
  },
  button: {
    padding: 10,
    backgroundColor: 'gray',
  },
  text: {
    color: 'white',
  },
});
