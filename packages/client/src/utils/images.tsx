import * as React from 'react';
import { StyleProp, Image, ImageStyle } from 'react-native';

import activeImageUpload from '../../assets/images/active-image-upload.png';
import agriculture from '../../assets/images/agriculture.png';
import appStore from '../../assets/images/appStore.png';
import child from '../../assets/images/child.png';
import electronics from '../../assets/images/electronics.png';
import google from '../../assets/images/googleIcon.png';
import house from '../../assets/images/house.png';
import household from '../../assets/images/household.png';
import imageUpload from '../../assets/images/image-upload.png';
import piacter from '../../assets/images/piacter.png';
import pig from '../../assets/images/pig.png';
import placeholderImage from '../../assets/images/placeholderImage.png';
import playStore from '../../assets/images/playStore.png';
import realEstate from '../../assets/images/real-estate.png';
import shopping from '../../assets/images/shopping.png';
import sport from '../../assets/images/sport.png';
import starFilled from '../../assets/images/star-filled.png';
import tools from '../../assets/images/tools.png';
import vehicle from '../../assets/images/vehicle.png';
import whiteLogo from '../../assets/images/whiteLogo.png';
import work from '../../assets/images/work.png';

interface Props {
  name: ImageName;
  style?: StyleProp<ImageStyle>;
}

const images = (style?: StyleProp<ImageStyle>) => ({
  'active-image-upload': () => (
    <Image source={activeImageUpload} style={style} />
  ),
  placeholder: () => <Image source={placeholderImage} style={style} />,
  'image-upload': () => <Image source={imageUpload} style={style} />,
  'white-logo': () => <Image source={whiteLogo} style={style} />,
  playStore: () => <Image source={playStore} style={style} />,
  appStore: () => <Image source={appStore} style={style} />,
  piacter: () => <Image source={piacter} style={style} />,
  google: () => <Image source={google} style={style} />,
  mezogazdasag: () => <Image source={agriculture} style={style} />,
  kabanna: () => <Image source={house} style={style} />,
  allatok: () => <Image source={pig} style={style} />,
  'sport-muveszet': () => <Image source={sport} style={style} />,
  'felszereles-szolgaltatas': () => <Image source={tools} style={style} />,
  jarmuvek: () => <Image source={vehicle} style={style} />,
  ingatlan: () => <Image source={realEstate} style={style} />,
  munkahely: () => <Image source={work} style={style} />,
  elektronika: () => <Image source={electronics} style={style} />,
  'divat-ruha': () => <Image source={shopping} style={style} />,
  'haztartas-kert': () => <Image source={household} style={style} />,
  'baba-mama': () => <Image source={child} style={style} />,
  'star-filled': () => <Image source={starFilled} style={style} />,
});

export type ImageName = keyof ReturnType<typeof images>;

export const ImageComponent: React.FC<Props> = ({ name, style }) => {
  return images(style)[name]();
};
