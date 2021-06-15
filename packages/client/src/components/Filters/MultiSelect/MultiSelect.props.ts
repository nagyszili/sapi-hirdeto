import { StyleProp, TextStyle } from 'react-native';

import { Element } from '../Select/SelectInput.props';

export interface MultiSelectProps {
  elements: Element[];
  selectedElements: any[];
  setSelectedElements: (elements: any[]) => void;
  placeholder?: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
}
