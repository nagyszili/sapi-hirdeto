import * as React from 'react';
import { Image, ImageProps } from 'react-native';

import activeImageUpload from '../../assets/images/active-image-upload.png';
import agriculture from '../../assets/images/agriculture.png';
import appStore from '../../assets/images/appStore.png';
import child from '../../assets/images/child.png';
import profilePic from '../../assets/images/defaultProfilePicture.png';
import electronics from '../../assets/images/electronics.png';
import google from '../../assets/images/googleIcon.png';
import house from '../../assets/images/house.png';
import household from '../../assets/images/household.png';
import imageUpload from '../../assets/images/image-upload.png';
import logo from '../../assets/images/logo.png';
import pig from '../../assets/images/pig.png';
import placeholderImage from '../../assets/images/placeholderImage.png';
import playStore from '../../assets/images/playStore.png';
import projectName from '../../assets/images/projectName.png';
import projectNameWhite from '../../assets/images/projectNameWhite1.png';
import realEstate from '../../assets/images/real-estate.png';
import shopping from '../../assets/images/shopping.png';
import sport from '../../assets/images/sport.png';
import starFilled from '../../assets/images/star-filled.png';
import tools from '../../assets/images/tools.png';
import vehicle from '../../assets/images/vehicle.png';
import whiteLogo from '../../assets/images/whiteLogo.png';
import work from '../../assets/images/work.png';

interface Props extends Omit<ImageProps, 'source'> {}

interface ImageComponentProps extends Props {
  name: ImageName;
}

const images = (props?: Props) => ({
  'active-image-upload': () => <Image source={activeImageUpload} {...props} />,
  placeholder: () => <Image source={placeholderImage} {...props} />,
  'image-upload': () => <Image source={imageUpload} {...props} />,
  'white-logo': () => <Image source={whiteLogo} {...props} />,
  playStore: () => <Image source={playStore} {...props} />,
  appStore: () => <Image source={appStore} {...props} />,
  logo: () => <Image source={logo} {...props} />,
  projectName: () => <Image source={projectName} {...props} />,
  projectNameWhite: () => <Image source={projectNameWhite} {...props} />,
  google: () => <Image source={google} {...props} />,
  mezogazdasag: () => <Image source={agriculture} {...props} />,
  kabanna: () => <Image source={house} {...props} />,
  'mezogazdasag-es-ipar': () => <Image source={agriculture} {...props} />,
  szallas: () => <Image source={house} {...props} />,
  allatok: () => <Image source={pig} {...props} />,
  'szabadido-es-sport': () => <Image source={sport} {...props} />,
  'sport-muveszet': () => <Image source={sport} {...props} />,
  'felszereles-szolgaltatas': () => <Image source={tools} {...props} />,
  jarmuvek: () => <Image source={vehicle} {...props} />,
  ingatlan: () => <Image source={realEstate} {...props} />,
  allas: () => <Image source={work} {...props} />,
  'muszaki-cikkek-es-elektronika': () => (
    <Image source={electronics} {...props} />
  ),
  'uzlet-es-szolgaltatas': () => <Image source={work} {...props} />,
  munkahely: () => <Image source={work} {...props} />,
  elektronika: () => <Image source={electronics} {...props} />,
  'divat-ruhazat': () => <Image source={shopping} {...props} />,
  'divat-ruha': () => <Image source={shopping} {...props} />,
  'haztartas-es-kert': () => <Image source={household} {...props} />,
  'haztartas-kert': () => <Image source={household} {...props} />,
  'baba-mama': () => <Image source={child} {...props} />,
  'star-filled': () => <Image source={starFilled} {...props} />,
  profilePicPlaceholder: () => <Image source={profilePic} {...props} />,
});

export type ImageName = keyof ReturnType<typeof images>;

export const ImageComponent: React.FC<ImageComponentProps> = ({
  name,
  ...props
}) => {
  return images(props)[name]();
};
