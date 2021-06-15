import * as React from 'react';
import { useRef } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { useHover } from 'react-native-web-hooks';

import { useComponentSize } from '../../hooks/useComponentSize';
import { Icon } from '../../utils/icons';
import {
  greyMediumColor,
  whiteColor,
  greyLightColor,
} from '../../utils/theme/colors';
import { Text } from '../themed/Text';
import { ModalHeaderProps } from './ModalHeader.props';

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, close }) => {
  const ref = useRef(null);
  const isHovered = useHover(ref);
  const componentSize = useComponentSize();

  return (
    <View style={styles(componentSize).container}>
      <View style={styles().button}>
        <Pressable
          onPress={close}
          style={[styles().close, isHovered && styles().hover]}
          ref={ref}
        >
          <Icon name="close" size={22} color={greyMediumColor} />
        </Pressable>
      </View>
      {!!title && (
        <Text style={styles().title} bold black>
          {title}
        </Text>
      )}
    </View>
  );
};

const styles = (componentSize?: string) =>
  StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: whiteColor,
      flex: 1,
      marginBottom: componentSize === 'small' ? 20 : 46,
      borderTopRightRadius: 6,
      borderTopLeftRadius: 6,
    },
    close: {
      padding: 5,
      borderRadius: 100,
      backgroundColor: whiteColor,
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
    hover: {
      backgroundColor: greyLightColor,
    },
  });
