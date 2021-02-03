import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
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

const icons = (size: number, color: string, style: StyleProp<TextStyle>) => ({
  'my-profile': () => (
    <FontAwesome name="user" size={size} color={color} style={style} />
  ),
  tab: () => (
    <Ionicons name="ios-code" size={size} color={color} style={style} />
  ),
  home: () => (
    <Ionicons name="md-home" size={size} color={color} style={style} />
  ),
  'home-outline': () => (
    <MaterialCommunityIcons
      name="home-outline"
      size={size}
      color={color}
      style={style}
    />
  ),
  cancel: () => (
    <MaterialCommunityIcons
      name="window-close"
      size={size}
      color={color}
      backgroundColor="red"
      style={style}
    />
  ),
  left: () => <AntDesign name="left" size={size} color={color} style={style} />,
  doubleLeft: () => (
    <AntDesign name="doubleleft" size={size} color={color} style={style} />
  ),
  right: () => (
    <AntDesign name="right" size={size} color={color} style={style} />
  ),
  doubleRight: () => (
    <AntDesign name="doubleright" size={size} color={color} style={style} />
  ),
  search: () => (
    <AntDesign name="search1" size={size} color={color} style={style} />
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
});

export type IconName = keyof ReturnType<typeof icons>;

export const Icon: React.FC<Props> = ({ name, color, size = 20, style }) => {
  const { colors } = useTheme();
  return icons(size, color || colors.text, style)[name]();
};
