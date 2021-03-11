import * as React from 'react';
import { useRef, useState, forwardRef } from 'react';
import {
  StyleSheet,
  TextInput as DefaultInput,
  Pressable,
  View,
} from 'react-native';
import { useFocus, useHover } from 'react-native-web-hooks';

import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';
import { Text } from '../themed/Text';
import { TextInputProps } from './TextInput.props';
import { useTextInput } from './useTextInput';

export const TextInput: React.FC<TextInputProps> = forwardRef(
  (
    { placeholder, secureTextEntry, maxLength, errorMessage, isNumberInput },
    ref,
  ) => {
    const thisRef = useRef(null);
    const isFocused = useFocus(thisRef);
    const isHovered = useHover(thisRef);
    const [secure, setSecure] = useState(secureTextEntry);
    const { value, error, onChangeText } = useTextInput(ref, errorMessage);

    const onChange = (text: string) => {
      onChangeText(isNumberInput ? text.replace(/[^0-9]/g, '') : text);
    };

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.row,
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
            ref={thisRef}
            style={styles.textInput}
            placeholder={placeholder}
            value={value}
            secureTextEntry={secure}
            maxLength={maxLength}
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
        <View style={[styles.errorContainer, !error && { display: 'none' }]}>
          <Text style={[styles.error]}>{error}</Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: 63,
  },
  row: {
    flexDirection: 'row',
    color: Color.greyDarkColor,
    backgroundColor: Color.whiteColor,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 0,
    height: 38,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Color.greyColor,
  },
  textInput: {
    flex: 1,
  },
  errorContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  error: {
    marginTop: 7,
    color: Color.errorColor,
  },
  icon: {
    backgroundColor: Color.whiteColor,
  },
});
