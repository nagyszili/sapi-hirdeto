import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const maxContentWidth = 1260;
export const globalPadding = 10;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
