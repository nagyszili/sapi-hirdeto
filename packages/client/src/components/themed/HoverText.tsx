import * as React from 'react';
import { useRef } from 'react';
import { Pressable, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { useHover } from 'react-native-web-hooks';

import { Text, TextProps } from '../themed/Text';

interface HoverTextProps extends TextProps {
  onPress?: () => void;
  disabled?: boolean;
  textHoverStyle?: StyleProp<TextStyle>;
  disableHover?: boolean;
}

export const HoverText: React.FC<HoverTextProps> = (props: HoverTextProps) => {
  const ref = useRef(null);
  const isHovered = useHover(ref);

  const {
    style,
    onPress,
    disabled,
    textHoverStyle,
    disableHover,
    ...otherProps
  } = props;

  return (
    <Pressable onPress={onPress} ref={ref} disabled={disabled}>
      <Text
        style={[
          styles.text,
          style,
          !disableHover && isHovered && (textHoverStyle || styles.textHover),
        ]}
        regular
        {...otherProps}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textHover: {
    textDecorationLine: 'underline',
  },
  text: {
    lineHeight: 22,
  },
});
