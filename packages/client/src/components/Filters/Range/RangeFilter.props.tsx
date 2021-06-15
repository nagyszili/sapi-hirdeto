import { StyleProp, TextStyle } from 'react-native';

import { Filter } from '../../../apollo/types/graphql-global-types';

export interface RangeFilterProps {
  title: string;
  label?: string;
  filters?: Filter[];
  labelStyle?: StyleProp<TextStyle>;
}
