import { Platform, useWindowDimensions } from 'react-native';

import { MIN_WIDTH_FOR_NATIVE_VIEW_ON_WEB } from '../utils/theme/responsiveness';

export const useComponentSize = () => {
  const { width } = useWindowDimensions();
  return width < MIN_WIDTH_FOR_NATIVE_VIEW_ON_WEB || Platform.OS !== 'web'
    ? 'small'
    : 'large';
};
