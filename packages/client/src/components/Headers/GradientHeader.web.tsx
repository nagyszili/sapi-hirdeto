import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import * as Color from '../../utils/theme/colors';
import { maxContentWidth, globalPadding } from '../../utils/theme/layout';
import { HoverText } from '../themed/HoverText';

export const GradientHeader: React.FC<{}> = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[Color.primaryColor, Color.secondaryColor]}
      style={styles.categoryHeader}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.categoryContent}>
        <View style={styles.categoryButton}>
          <HoverText
            medium
            white
            semiBold
            textHoverStyle={styles.categoryHover}
            onPress={() =>
              navigation.navigate('AdsScreen', {
                mainCategoryIdentifier: 'ingatlan',
                categoryIdentifier: 'lakas',
                filters: undefined,
                price: undefined,
                location: undefined,
                query: undefined,
              })
            }
          >
            Lakás
          </HoverText>
        </View>

        <View style={styles.categoryButton}>
          <HoverText
            medium
            white
            semiBold
            textHoverStyle={styles.categoryHover}
            onPress={() =>
              navigation.navigate('AdsScreen', {
                mainCategoryIdentifier: 'allas',
                categoryIdentifier: '',
                filters: undefined,
                price: undefined,
                location: undefined,
                query: undefined,
              })
            }
          >
            Állás
          </HoverText>
        </View>

        <View style={styles.categoryButton}>
          <HoverText
            medium
            white
            semiBold
            textHoverStyle={styles.categoryHover}
            onPress={() =>
              navigation.navigate('AdsScreen', {
                mainCategoryIdentifier: 'konyvek',
                categoryIdentifier: '',
                filters: undefined,
                price: undefined,
                location: undefined,
                query: undefined,
              })
            }
          >
            Könyvek
          </HoverText>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  categoryContent: {
    flex: 1,
    maxWidth: maxContentWidth,
    paddingHorizontal: globalPadding,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  categoryButton: {
    marginRight: 34,
  },
  categoryHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  categoryHover: {
    opacity: 0.75,
  },
});
