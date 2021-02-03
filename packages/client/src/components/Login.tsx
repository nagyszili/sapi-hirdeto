import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';

export const Login: React.FC<{}> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Submit" onPress={() => {}} />
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
  },
  inputStyle: {
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
