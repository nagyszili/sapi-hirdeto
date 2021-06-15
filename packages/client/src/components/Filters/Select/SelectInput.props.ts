import { StyleProp, TextStyle } from 'react-native';

export interface SelectInputProps {
  elements: Element[];
  selectedElement?: any;
  setSelectedElement: (element: any) => void;
  placeholder?: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  isSearchable?: boolean;
  error?: string;
}

export interface Element {
  value: any;
  label: string;
}
