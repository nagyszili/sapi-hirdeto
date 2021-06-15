import * as React from 'react';
import { CSSProperties, forwardRef, useRef } from 'react';
import { View } from 'react-native';
import { useFocus, useHover } from 'react-native-web-hooks';

import { useTextInput } from '../../hooks/useTextInput';
import * as Color from '../../utils/theme/colors';
import { InputError } from '../InputError';
import { TextInputProps } from '../TextInput/TextInput.props';

export const TextArea: React.FC<TextInputProps> = forwardRef(
  ({ initialValue, placeholder, errorMessage, containerStyle }, ref) => {
    const { value, onChangeText, error } = useTextInput(
      ref,
      errorMessage,
      initialValue
    );

    const thisRef = useRef(null);
    const isFocused = useFocus(thisRef);
    const isHovered = useHover(thisRef);

    const onChange = (event: any) => onChangeText(event.target.value);

    return (
      <View style={containerStyle}>
        <textarea
          ref={thisRef}
          value={value}
          onChange={onChange}
          cols={40}
          rows={10}
          style={
            error
              ? textAreaError
              : isFocused
              ? textAreaFocus
              : isHovered
              ? textAreaHover
              : textArea
          }
          placeholder={placeholder}
        />
        <InputError error={error} />
      </View>
    );
  }
);

const textArea: CSSProperties = {
  resize: 'none',
  outline: 'none',
  borderColor: Color.greyColor,
  borderRadius: 6,
  padding: 15,
  color: Color.greyDarkColor,
  fontFamily: 'Inter-Regular',
  fontSize: 15,
};

const textAreaError: CSSProperties = {
  ...textArea,
  borderColor: Color.errorColor,
};

const textAreaHover: CSSProperties = {
  ...textArea,
  borderColor: 'rgba(150, 150, 150, 0.5)',
};

const textAreaFocus: CSSProperties = {
  ...textArea,
  borderColor: Color.blackColor,
};
