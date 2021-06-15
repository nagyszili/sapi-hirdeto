import * as React from 'react';
import { StyleSheet } from 'react-native';

import { whiteColor } from '../../utils/theme/colors';
import { UIStateComponent } from '../UIStateComponent/UIStateComponent';

export const UIStateContainer: React.FC<{}> = () => {
  return (
    <UIStateComponent
      style={styles.container}
      safeContainerStyle={styles.safeContainer}
      animationIn="fadeIn"
      animationOut="fadeOut"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    position: 'absolute',
    minWidth: 650,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  safeContainer: {
    width: 410,
    borderRadius: 6,
    backgroundColor: whiteColor,
  },
});
