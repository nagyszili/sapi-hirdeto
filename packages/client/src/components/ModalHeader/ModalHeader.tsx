import * as React from 'react';
import { useRef } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { useHover } from 'react-native-web-hooks';

import { Icon } from '../../utils/icons';
import {
  greyMediumColor,
  whiteColor,
  greyLightColor,
} from '../../utils/theme/colors';
import { Text } from '../themed/Text';

interface ModalHeaderProps {
  title: string;
  close: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, close }) => {
  const ref = useRef(null);
  const isHovered = useHover(ref);

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Pressable
          onPress={close}
          style={[styles.close, isHovered && styles.hover]}
          ref={ref}
        >
          <Icon name="close" size={22} color={greyMediumColor} />
        </Pressable>
      </View>
      <Text style={styles.title} bold black>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: whiteColor,
    flex: 1,
    marginBottom: 46,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
  },
  button: {
    paddingTop: 13,
    paddingRight: 13,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  close: {
    padding: 5,
    borderRadius: 100,
    backgroundColor: whiteColor,
  },
  hover: {
    backgroundColor: greyLightColor,
  },
});
