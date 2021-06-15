import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';

import texts from '../../../../../assets/texts/texts.json';
import { showOperationsModal } from '../../../../apollo/ui/modalMutations';
import { AddFavoriteButton } from '../../../../components/Buttons/AddFavoriteButton';
import { MoreButton } from '../../../../components/Buttons/MoreButton';
import { Text } from '../../../../components/themed/Text';
import { ImageComponent } from '../../../../utils/images';
import {
  formatPriceToString,
  formatCreatedDateToString,
} from '../../../../utils/index';
import { whiteColor } from '../../../../utils/theme/colors';
import { AdItemProps } from '../AdItemProps';

export const AdListItem: React.FC<AdItemProps> = ({
  item,
  user,
  hideAdToFavorite,
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
      </View>
      <View style={styles.content}>
        <View>
          <Text
            small
            black
            regular
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.title}
          >
            {item.name}
          </Text>
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
        <View style={styles.negotiableText}>
          {item.negotiable && (
            <Text small greyMedium>
              {texts.trueNegotiable}
            </Text>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <Text medium black semiBold numberOfLines={1}>
            {`${formatPriceToString(item.price)} ${
              texts[item.currency as keyof typeof texts]
            }`}
          </Text>

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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    width: 180,
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
    flex: 1,
  },
  title: {
    lineHeight: 21,
    width: '100%',
  },
  locationText: {
    marginBottom: 2,
    width: '100%',
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  starIcon: {
    marginLeft: 5,
    padding: 5,
  },
  negotiableText: {
    marginTop: 'auto',
  },
});
