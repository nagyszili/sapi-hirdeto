import {
  TextInputProps as DefaultInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface TextInputProps extends DefaultInputProps {
  initialValue?: string | null | undefined;
  secureTextEntry?: boolean;
  errorMessage?: (value: string) => string | undefined;
  ref?: any;
  isNumberInput?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  rowStyle?: StyleProp<ViewStyle>;
}
