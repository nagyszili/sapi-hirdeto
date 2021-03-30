import * as React from 'react';
import { CSSProperties, forwardRef } from 'react';

import * as Color from '../../utils/theme/colors';
import { useTextInput } from '../TextInput/useTextInput';

interface Props {
  ref?: any;
  placeholder?: string;
}

export const TextArea: React.FC<Props> = forwardRef(({ placeholder }, ref) => {
  const { value, onChangeText } = useTextInput(ref);

  const onChange = (event: any) => onChangeText(event.target.value);

  return (
    <textarea
      value={value}
      onChange={onChange}
      cols={40}
      rows={10}
      style={textArea}
      placeholder={placeholder}
    />
  );
});

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
