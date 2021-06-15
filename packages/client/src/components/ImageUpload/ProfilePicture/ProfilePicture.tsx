import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import * as Color from '../../../utils/theme/colors';

interface Props {
  image?: string;
}

export const ProfilePicture: React.FC<Props> = ({ image }) => {
  return (
    <View style={styles.profileContainer}>
      <Image
        style={styles.profilePic}
        source={{ uri: image }}
        resizeMethod="resize"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderColor: Color.greyColor,
    borderWidth: 1,
    borderRadius: 100,
  },
});
