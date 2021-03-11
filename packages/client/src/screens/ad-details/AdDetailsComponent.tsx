import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Button, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import { Text } from '../../components/themed/Text';
import { AdDetailsComponentProps } from './AdDetailsComponent.props';

const images = [
  {
    url:
      'https://s13emagst.akamaized.net/products/30050/30049487/images/res_01824cf54f82946dbc630baad5f3cf78.jpg',

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance
  },
  {
    url:
      'https://s13emagst.akamaized.net/products/30050/30049487/images/res_91a1479d75b7544136686d02b5958ead.jpg',
  },
];

export const AdDetailsComponent: React.FC<AdDetailsComponentProps> = ({
  ad,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal visible={isVisible}>
        <ImageViewer
          imageUrls={images}
          enableSwipeDown
          enablePreload
          onSwipeDown={() => setIsVisible(false)}
        />
      </Modal>
      <Button title="Click for image" onPress={() => setIsVisible(true)} />

      <Text>Title: {ad.name} </Text>
      <Text>
        Price: {ad.price} {ad.currency}
      </Text>
      <Text>Views : {ad.views}</Text>
      {!!ad.description && <Text>Description : {ad.description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
