import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';

import texts from '../../../../../assets/texts/texts.json';
import { useActiveCurrency } from '../../../../apollo/filters/useActiveCurrency';
import { AddFavoriteButton } from '../../../../components/Buttons/AddFavoriteButton';
import { Text } from '../../../../components/themed/Text';
import { ImageComponent } from '../../../../utils/images';
import {
  formatPriceToString,
  formatCreatedDateToString,
} from '../../../../utils/index';
import { whiteColor } from '../../../../utils/theme/colors';
import { AdListItemProps } from './AdListItem.props';

export const AdListItem: React.FC<AdListItemProps> = ({
  item,
  index,
  user,
}) => {
  const navigation = useNavigation();
  const { data: currency } = useActiveCurrency();

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
          <ImageComponent name="placeholder" />
        )}
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
          <AddFavoriteButton
            style={styles.starIcon}
            user={user}
            adId={item.id}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
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
    width: 125,
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
  starIcon: {
    marginLeft: 0,
    padding: 5,
  },
});
