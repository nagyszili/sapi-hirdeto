import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { useAddToFavorites } from '../../../apollo/ad/useAddToFavorites';
import { useActiveCurrency } from '../../../apollo/filters/useActiveCurrency';
import { Text } from '../../../components/themed/Text';
import { Icon } from '../../../utils/icons';
import {
  formatPriceToString,
  formatCreatedDateToString,
} from '../../../utils/index';
import * as Color from '../../../utils/theme/colors';
import { whiteColor } from '../../../utils/theme/colors';
import { AdListItemProps } from './AdListItem.props';

export const AdListItem: React.FC<AdListItemProps> = ({
  item,
  index,
  favorite,
}) => {
  const navigation = useNavigation();
  const { data: currency } = useActiveCurrency();
  const [addToFavorites] = useAddToFavorites(() =>
    setIsFavorite((oldValue) => !oldValue),
  );
  const [isFavorite, setIsFavorite] = useState(favorite);

  const createdAt = new Date(item.createdAt);
  const isLeftColumn = index % 2 === 0;
  return (
    <Pressable
      style={[
        styles.container,
        isLeftColumn ? styles.leftColumn : styles.rightColumn,
      ]}
      onPress={() =>
        navigation.navigate('AdDetailsScreen', {
          identifier: item.identifier,
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              item.thumbnail ||
              'https://frankfurt.apollo.olxcdn.com/v1/files/tjjoqx5q0d2w3-RO/image;s=1000x700',
          }}
        />
      </View>
      <View style={styles.content}>
        <Pressable
          onPress={() =>
            navigation.navigate('AdDetailsScreen', {
              identifier: item.identifier,
            })
          }
        >
          <Text
            small
            black
            regular
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.title}
          >
            {item.name}
          </Text>
        </Pressable>

        <Text medium black semiBold>
          {formatPriceToString(item.price)}{' '}
          {texts[currency!.currency as keyof typeof texts]}
        </Text>

        <View style={styles.bottomContainer}>
          <View>
            <Text extraSmall greyDark regular style={styles.locationText}>
              {item.location.name}, {item.location.county}
            </Text>

            <Text regular extraSmall greyDark>
              {formatCreatedDateToString(createdAt)}
            </Text>
          </View>
          <Pressable
            onPress={() => addToFavorites({ variables: { adId: item.id } })}
          >
            <Icon
              name="star-empty"
              size={22}
              color={isFavorite ? Color.primaryColor : Color.blackColor}
            />
          </Pressable>
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
  },
  leftColumn: {
    marginRight: 4,
    borderBottomRightRadius: 6,
  },
  rightColumn: {
    marginLeft: 4,
    borderBottomLeftRadius: 6,
  },
  imageContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 203,
    height: 160,
  },
  content: {
    paddingTop: 0,
    padding: 13,
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    lineHeight: 26,
    width: '100%',
  },
  locationText: {
    marginBottom: 2,
  },
  bottomContainer: {
    marginTop: 9,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: 100,
  },
});
