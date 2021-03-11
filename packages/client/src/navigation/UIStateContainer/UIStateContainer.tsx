import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { UIStateComponent } from '../UIStateComponent/UIStateComponent';

export const UIStateContainer: React.FC<{}> = () => {
  return (
    <UIStateComponent
      style={styles.container}
      safeContainerStyle={styles.safeContainer}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flexDirection: 'row',
  },
  safeContainer: {
    maxHeight: Dimensions.get('window').height - 44,
    flex: 1,
    width: '100%',
    alignSelf: 'flex-end',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
});
