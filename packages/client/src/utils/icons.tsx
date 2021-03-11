import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  createIconSetFromIcoMoon,
  FontAwesome,
} from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';

interface Props {
  name: IconName;
  color?: string;
  size?: number;
  style?: StyleProp<TextStyle>;
}

const IcoMoon = createIconSetFromIcoMoon(
  require('../../assets/icons/selection.json'),
  'IcoMoon',
  'icomoon.ttf',
);

const icons = (size: number, color: string, style: StyleProp<TextStyle>) => ({
  'my-profile': () => (
    <IcoMoon name="ic24-user" size={size} color={color} style={style} />
  ),
  tab: () => (
    <Ionicons name="ios-code" size={size} color={color} style={style} />
  ),
  home: () => (
    <IcoMoon name="ic24-home" size={size} color={color} style={style} />
  ),
  close: () => (
    <IcoMoon name="ic24-close" size={size} color={color} style={style} />
  ),
  left: () => (
    <IcoMoon name="ic24-chevron-left" size={size} color={color} style={style} />
  ),
  doubleLeft: () => (
    <AntDesign name="doubleleft" size={size} color={color} style={style} />
  ),
  right: () => (
    <IcoMoon
      name="ic24-chevron-right"
      size={size}
      color={color}
      style={style}
    />
  ),
  doubleRight: () => (
    <AntDesign name="doubleright" size={size} color={color} style={style} />
  ),
  search: () => (
    <IcoMoon name="ic24-search" size={size} color={color} style={style} />
  ),
  'checkbox-checked': () => (
    <MaterialIcons name="check-box" size={size} color={color} style={style} />
  ),
  'checkbox-unchecked': () => (
    <MaterialIcons
      name="check-box-outline-blank"
      size={size}
      color={color}
      style={style}
    />
  ),
  'plus-circle': () => (
    <IcoMoon name="ic24-plus-circle" size={size} color={color} style={style} />
  ),
  plus: () => (
    <IcoMoon name="ic24-plus" size={size} color={color} style={style} />
  ),
  'arrow-left': () => (
    <IcoMoon name="ic24-arrow-left" size={size} color={color} style={style} />
  ),
  'star-empty': () => (
    <IcoMoon name="ic24-star-empty" size={size} color={color} style={style} />
  ),
  'star-filled': () => (
    <IcoMoon name="ic24-star-filled" size={size} color={color} style={style} />
  ),
  camera: () => (
    <IcoMoon name="ic24-camera" size={size} color={color} style={style} />
  ),
  visibility: () => (
    <IcoMoon name="ic24-visibility" size={size} color={color} style={style} />
  ),
  'visibility-off': () => (
    <IcoMoon
      name="ic24-visibility-off"
      size={size}
      color={color}
      style={style}
    />
  ),
  location: () => (
    <IcoMoon name="ic24-map" size={size} color={color} style={style} />
  ),
  whatsapp: () => (
    <FontAwesome name="whatsapp" size={size} color={color} style={style} />
  ),
  phone: () => (
    <IcoMoon name="ic24-phone" size={size} color={color} style={style} />
  ),
});

export type IconName = keyof ReturnType<typeof icons>;

export const Icon: React.FC<Props> = ({ name, color, size = 20, style }) => {
  const { colors } = useTheme();
  return icons(size, color || colors.text, style)[name]();
};
