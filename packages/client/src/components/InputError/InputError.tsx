import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import * as Color from '../../utils/theme/colors';
import { Text } from '../themed/Text';

interface Props {
  error?: string;
}

export const InputError: React.FC<Props> = ({ error }) => {
  return (
    <View style={[styles.errorContainer, !error && { display: 'none' }]}>
      <Text style={[styles.error]}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  error: {
    marginTop: 7,
    color: Color.errorColor,
  },
});
