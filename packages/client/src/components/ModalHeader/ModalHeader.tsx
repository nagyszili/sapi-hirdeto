import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '../themed/Text';
import { ModalHeaderProps } from './ModalHeader.props';

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {!!title && (
        <Text style={styles.title} bold black>
          {title}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 23,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    marginTop: 4,
  },
  line: {
    width: 54,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D8D8D8',
    marginVertical: 12,
  },
});
