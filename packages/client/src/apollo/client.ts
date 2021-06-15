import { ApolloClient } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUploadLink } from 'apollo-upload-client';
import Constants from 'expo-constants';

import { cache } from './cache';
//@ts-ignore
const httpLink = createUploadLink({
  uri: Constants?.manifest?.extra?.backendUrl,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  connectToDevTools: true,
});
