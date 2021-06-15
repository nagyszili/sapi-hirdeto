import * as React from 'react';
import { useRef } from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { useHover } from 'react-native-web-hooks';

import * as Color from '../../utils/theme/colors';
import { Text } from '../themed/Text';

interface Props {
  onPress?: () => void;
  text?: string;
  showBottomLine?: boolean;
}

export const Row: React.FC<Props> = ({ onPress, text, showBottomLine }) => {
  const ref = useRef(null);
  const isHovered = useHover(ref);

  return (
    <Pressable style={isHovered && styles.hover} ref={ref} onPress={onPress}>
      <Text style={styles.row} small>
        {text}
      </Text>
      {showBottomLine && <View style={styles.line} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  hover: {
    backgroundColor: Color.greyLightColor,
  },
  row: {
    paddingVertical: 14,
    paddingLeft: 20,
    ...(Platform.OS === 'web' ? { userSelect: 'none' } : {}),
    color: Color.greyDarkColor,
  },
  line: {
    height: 1,
    backgroundColor: Color.greyColor,
  },
});
