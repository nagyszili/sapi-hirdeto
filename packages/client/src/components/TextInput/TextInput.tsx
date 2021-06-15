import * as React from 'react';
import { useRef, useState, forwardRef } from 'react';
import {
  StyleSheet,
  TextInput as DefaultInput,
  Pressable,
  View,
} from 'react-native';
import { useFocus, useHover } from 'react-native-web-hooks';

import { useTextInput } from '../../hooks/useTextInput';
import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';
import { InputError } from '../InputError';
import { TextInputProps } from './TextInput.props';

export const TextInput: React.FC<TextInputProps> = forwardRef(
  (
    {
      initialValue,
      secureTextEntry,
      errorMessage,
      isNumberInput,
      containerStyle,
      rowStyle,
      ...props
    },
    ref
  ) => {
    const thisRef = useRef(null);
    const isFocused = useFocus(thisRef);
    const isHovered = useHover(thisRef);
    const [secure, setSecure] = useState(secureTextEntry);
    const { value, error, onChangeText } = useTextInput(
      ref,
      errorMessage,
      initialValue
    );

    const onChange = (text: string) => {
      onChangeText(isNumberInput ? text.replace(/[^0-9]/g, '') : text);
    };

    return (
      <View style={containerStyle}>
        <View
          style={[
            styles.row,
            rowStyle,
            {
              borderColor: error
                ? Color.errorColor
                : isFocused
                ? Color.blackColor
                : isHovered
                ? 'rgba(150, 150, 150, 0.5)'
                : Color.greyColor,
            },
          ]}
        >
          <DefaultInput
            {...props}
            ref={thisRef}
            style={styles.textInput}
            value={value}
            secureTextEntry={secure}
            onChangeText={onChange}
          />
          {secureTextEntry && (
            <Pressable
              style={styles.icon}
              onPress={() => {
                setSecure((oldValue) => !oldValue);
              }}
            >
              <Icon
                name={secure ? 'visibility' : 'visibility-off'}
                color={Color.greyMediumColor}
              />
            </Pressable>
          )}
        </View>
        <InputError error={error} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    color: Color.greyDarkColor,
    backgroundColor: Color.whiteColor,
    height: 46,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Color.greyColor,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  icon: {
    backgroundColor: Color.whiteColor,
    justifyContent: 'center',
    margin: 5,
  },
});
