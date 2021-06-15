import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Pressable, Image } from 'react-native';

import texts from '../../../../../assets/texts/texts.json';
import { showOperationsModal } from '../../../../apollo/ui/modalMutations';
import { AddFavoriteButton } from '../../../../components/Buttons/AddFavoriteButton';
import { MoreButton } from '../../../../components/Buttons/MoreButton';
import { NumberOfImagesComponent } from '../../../../components/NumberOfImagesComponent';
import { Text } from '../../../../components/themed/Text';
import {
  formatCreatedDateToString,
  formatPriceToString,
} from '../../../../utils';
import { ImageComponent } from '../../../../utils/images';
import { whiteColor } from '../../../../utils/theme/colors';
import { AdItemProps } from '../AdItemProps';

export const AdGalleryItem: React.FC<AdItemProps> = ({
  item,
  hideAdToFavorite,
  user,
}) => {
  const navigation = useNavigation();

  const createdAt = new Date(item.createdAt);
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigation.navigate('AdDetailsScreen', {
          identifier: item.identifier,
        })
      }
    >
      <View style={styles.imageContainer}>
        {item.thumbnail ? (
          <Image
            style={styles.image}
            resizeMethod="resize"
            resizeMode="cover"
            source={{
              uri: item.thumbnail,
            }}
          />
        ) : (
          <View style={styles.image}>
            <ImageComponent
              style={styles.imagePlaceholder}
              name="placeholder"
              resizeMode="contain"
              resizeMethod="scale"
            />
          </View>
        )}
        <NumberOfImagesComponent
          numberOfImages={item.numberOfImages}
          containerStyle={styles.imageIconContainer}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.namePriceContainer}>
          <Text
            medium
            black
            regular
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.title}
          >
            {item.name}
          </Text>

          <Text large black semiBold style={styles.price}>
            {`${formatPriceToString(item.price)} ${
              texts[item.currency as keyof typeof texts]
            }`}
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <View>
            <Text
              extraSmall
              greyDark
              regular
              style={styles.locationText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.location.name}, {item.location.county}
            </Text>

            <Text regular extraSmall greyDark>
              {formatCreatedDateToString(createdAt)}
            </Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
            {item.negotiable && (
              <Text small greyMedium style={styles.negotiableText}>
                {texts.trueNegotiable}
              </Text>
            )}
            {!hideAdToFavorite ? (
              <AddFavoriteButton
                style={styles.starIcon}
                user={user}
                adId={item.id}
              />
            ) : (
              <MoreButton
                onPress={() =>
                  showOperationsModal({
                    adId: item.id,
                    userId: item.user.id,
                    adIdentifier: item.identifier,
                    adName: item.name,
                  })
                }
              />
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
    marginVertical: 8,
    flexDirection: 'column',
  },
  imageContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 230,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 80,
    flex: 1,
  },
  content: {
    justifyContent: 'space-between',
    padding: 15,
    paddingTop: 12,
    flex: 1,
  },
  namePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    lineHeight: 21,
    flex: 1,
  },
  price: {
    marginLeft: 25,
  },
  locationText: {
    marginBottom: 2,
    width: '100%',
    marginTop: 'auto',
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  starIcon: {
    marginLeft: 'auto',
    padding: 5,
  },
  imageIconContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  negotiableText: {
    marginTop: 10,
  },
});
