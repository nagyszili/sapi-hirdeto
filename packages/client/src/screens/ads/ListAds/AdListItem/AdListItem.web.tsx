import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { useRef } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { useHover } from 'react-native-web-hooks';

import texts from '../../../../../assets/texts/texts.json';
import { useActiveCurrency } from '../../../../apollo/filters/useActiveCurrency';
import { AddFavoriteButton } from '../../../../components/Buttons/AddFavoriteButton';
import { Button } from '../../../../components/Buttons/Button';
import { Text } from '../../../../components/themed/Text';
import { Icon } from '../../../../utils/icons';
import { ImageComponent } from '../../../../utils/images';
import {
  formatPriceToString,
  formatCreatedDateToString,
} from '../../../../utils/index';
import * as Color from '../../../../utils/theme/colors';
import { whiteColor, greyColor } from '../../../../utils/theme/colors';
import { AdListItemProps } from './AdListItem.props';

export const AdListItem: React.FC<AdListItemProps> = ({ item, user }) => {
  const navigation = useNavigation();
  const { data: currency } = useActiveCurrency();
  const ref = useRef(null);
  const isHovered = useHover(ref);
  const createdAt = new Date(item.createdAt);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('AdDetailsScreen', {
          identifier: item.identifier,
        })
      }
      ref={ref}
      style={[styles.container, isHovered && styles.hover]}
    >
      <View style={styles.imageContainer}>
        {item.thumbnail ? (
          <Image
            style={styles.image}
            source={{
              uri: item.thumbnail,
            }}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <ImageComponent
              name="placeholder"
              style={{ height: 80, width: 80 }}
            />
          </View>
        )}
        <LinearGradient
          colors={[Color.secondaryColor, Color.primaryColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.imageIconContainer}
        >
          <Icon name="camera" size={18} color={Color.whiteColor} />
          <Text semiBold style={styles.imageIconText}>
            {item.numberOfImages}
          </Text>
        </LinearGradient>
      </View>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          <View>
            <View>
              <Text
                extraLarge
                black
                semiBold
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.title}
              >
                {item.name}
              </Text>
            </View>

            <Text small greyMedium regular style={styles.locationText}>
              {item.location.name}, {item.location.county}
            </Text>
            <Text
              medium
              regular
              greyDark
              numberOfLines={3}
              ellipsizeMode="tail"
              style={styles.descriptionText}
            >
              {item.description || '-'}
            </Text>
          </View>

          <Text regular extraSmall greyMedium>
            {formatCreatedDateToString(createdAt)}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text extraLarge black semiBold style={styles.price}>
            {formatPriceToString(item.price)}{' '}
            {texts[currency!.currency as keyof typeof texts]}
          </Text>
          <View style={styles.buttonContainer}>
            <AddFavoriteButton user={user} adId={item.id} />

            <Button
              style={styles.button}
              onPress={() =>
                navigation.navigate('AdDetailsScreen', {
                  identifier: item.identifier,
                })
              }
            >
              <Text semiBold white>
                {texts['details']}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 228,
    width: '100%',
    backgroundColor: whiteColor,
    borderRadius: 6,
    marginVertical: 6,
    borderColor: 'transparent',
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  imageContainer: {
    marginLeft: 14,
    marginVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 262,
    height: 200,
    borderRadius: 6,
  },
  imageIconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 14,
    backgroundColor: whiteColor,
    borderRadius: 5,
    width: 45,
    height: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIconText: {
    color: Color.whiteColor,
    fontSize: 13,
    marginLeft: 4,
  },
  content: {
    padding: 28,
    paddingLeft: 24,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  leftContainer: {
    justifyContent: 'space-between',
  },
  rightContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    lineHeight: 26,
    minWidth: 250,
    maxWidth: 500,
  },
  price: {
    lineHeight: 26,
  },
  locationText: {
    marginVertical: 6,
  },
  descriptionText: {
    marginVertical: 6,
    minWidth: 250,
    maxWidth: 500,
  },
  hover: {
    borderColor: greyColor,
    borderWidth: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starFilled: {
    marginRight: 2,
    width: 20,
    height: 20,
  },
  button: {
    width: 100,
    marginLeft: 24,
  },
  placeholderImage: {
    width: 262,
    height: 200,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f736',
  },
});
