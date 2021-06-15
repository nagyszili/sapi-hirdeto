import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useRef } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { useHover } from 'react-native-web-hooks';

import texts from '../../../../../assets/texts/texts.json';
import { AddFavoriteButton } from '../../../../components/Buttons/AddFavoriteButton';
import { Button } from '../../../../components/Buttons/Button';
import { NumberOfImagesComponent } from '../../../../components/NumberOfImagesComponent';
import { Text } from '../../../../components/themed/Text';
import { ImageComponent } from '../../../../utils/images';
import {
  formatPriceToString,
  formatCreatedDateToString,
} from '../../../../utils/index';
import * as Color from '../../../../utils/theme/colors';
import { AdItemProps } from '../AdItemProps';

export const AdListItem: React.FC<AdItemProps> = ({
  item,
  user,
  hideAdToFavorite,
}) => {
  const navigation = useNavigation();
  const ref = useRef(null);
  const isHovered = useHover(ref);
  const createdAt = new Date(item.createdAt);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('AdDetailsScreen', {
          identifier: item.identifier,
        });
      }}
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
        <NumberOfImagesComponent
          numberOfImages={item.numberOfImages}
          containerStyle={styles.imageIconContainer}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
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
            {`${formatPriceToString(item.price)} ${
              texts[item.currency as keyof typeof texts]
            }`}
          </Text>
          {item.negotiable && (
            <Text small greyMedium style={styles.negotiableText}>
              {texts.trueNegotiable}
            </Text>
          )}

          <View style={styles.buttonContainer}>
            {!hideAdToFavorite && (
              <AddFavoriteButton user={user} adId={item.id} />
            )}

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
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    marginVertical: 6,
    borderColor: 'transparent',
    borderWidth: 2,
    borderStyle: 'dashed',
    overflow: 'hidden',
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
    flex: 1,
    marginRight: 10,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  title: {
    lineHeight: 26,
    minWidth: 150,
    maxWidth: 600,
  },
  descriptionText: {
    marginVertical: 6,
    minWidth: 150,
    maxWidth: 600,
  },
  price: {
    lineHeight: 26,
  },
  locationText: {
    marginVertical: 6,
  },
  hover: {
    borderColor: Color.greyColor,
    borderWidth: 2,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
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
  negotiableText: {
    marginTop: 6,
    marginLeft: 'auto',
    marginBottom: 29,
  },
});
