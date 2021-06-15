import * as React from 'react';
import { useRef } from 'react';
import {
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useHover } from 'react-native-web-hooks';

import * as Color from '../../utils/theme/colors';
import { Text } from '../themed/Text';

interface Props {
  onPress: () => void;
  text?: string;
  renderComponent?: () => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  hoverStyle?: StyleProp<ViewStyle>;
  children?: any;
  disableHover?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<Props> = ({
  onPress,
  text,
  style,
  hoverStyle,
  children,
  disableHover,
  textStyle,
}) => {
  const ref = useRef(null);
  const isHovered = useHover(ref);
  return (
    <Pressable
      style={[
        styles.container,
        style,
        !disableHover && isHovered && (hoverStyle || styles.hover),
      ]}
      onPress={onPress}
      ref={ref}
    >
      {children}
      {text && <Text style={[styles.text, textStyle]}>{text}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 38,
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: Color.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  hover: {
    backgroundColor: Color.primaryLightColor,
  },
  text: {
    lineHeight: 22,
    color: Color.whiteColor,
  },
});
