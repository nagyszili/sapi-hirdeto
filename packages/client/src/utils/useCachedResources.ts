import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Image } from 'react-native';

import { client } from '../apollo/client';
import { FIND_ALL_MAIN_CATEGORIES } from '../apollo/main-category/useAllMainCategories';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const cacheImages = (images: any[]) => {
    return images.map((image: any) => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        cacheImages([require('../../assets/images/googleIcon.png')]);
        cacheImages([require('../../assets/images/agriculture.png')]);
        cacheImages([require('../../assets/images/child.png')]);
        cacheImages([require('../../assets/images/house.png')]);
        cacheImages([require('../../assets/images/electronics.png')]);
        cacheImages([require('../../assets/images/household.png')]);
        cacheImages([require('../../assets/images/pig.png')]);
        cacheImages([require('../../assets/images/real-estate.png')]);
        cacheImages([require('../../assets/images/shopping.png')]);
        cacheImages([require('../../assets/images/sport.png')]);
        cacheImages([require('../../assets/images/tools.png')]);
        cacheImages([require('../../assets/images/vehicle.png')]);
        cacheImages([require('../../assets/images/work.png')]);
        cacheImages([require('../../assets/images/whiteLogo.png')]);

        await Font.loadAsync({
          ...Ionicons.font,
          ...MaterialIcons.font,
          IcoMoon: require('../../assets/icons/icomoon.ttf'),

          'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
          'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
          'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
          'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
        });
        await Promise.all([client.query({ query: FIND_ALL_MAIN_CATEGORIES })]);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
