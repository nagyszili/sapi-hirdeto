import { TextInputProps as DefaultInputProps } from 'react-native';

export interface TextInputProps extends DefaultInputProps {
  secureTextEntry?: boolean;
  errorMessage?: (value: string) => string | undefined;
  ref?: any;
  isNumberInput?: boolean;
}
