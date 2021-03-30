import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';

import profilePic from '../../../assets/images/defaultProfilePicture.png';
import texts from '../../../assets/texts/texts.json';
import { AdAttributeTable } from '../../components/AdAttributeTable/AdAttributeTable';
import { AddFavoriteButton } from '../../components/Buttons/AddFavoriteButton';
import { Button } from '../../components/Buttons/Button';
import { Footer } from '../../components/Footer/Footer';
import { ImageViewer } from '../../components/ImageViewer/ImageViewer';
import { HoverText } from '../../components/themed/HoverText';
import { Text } from '../../components/themed/Text';
import { formatCreatedDateToString, formatPriceToString } from '../../utils';
import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';
import { maxContentWidth } from '../../utils/theme/layout';
import { AdDetailsComponentProps } from './AdDetailsComponent.props';

export const AdDetailsComponent: React.FC<AdDetailsComponentProps> = ({
  ad,
  user,
}) => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.content}>
        <View style={styles.breadcrumb}>
          <HoverText
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
            extraSmall
            greyMedium
          >
            {texts['mainPage']}
          </HoverText>
          <Text greyMedium>{` › `}</Text>
          <HoverText
            onPress={() => {
              navigation.navigate('AdsScreen', {
                mainCategoryIdentifier: ad.category.mainCategory.identifier,
              });
            }}
            extraSmall
            greyMedium
          >
            {ad.category.mainCategory.name}
          </HoverText>
          <Text greyMedium>{` › `}</Text>
          <HoverText
            onPress={() => {
              navigation.navigate('AdsScreen', {
                categoryIdentifier: ad.category.identifier,
                mainCategoryIdentifier: ad.category.mainCategory.identifier,
              });
            }}
            extraSmall
            greyMedium
          >
            {ad.category.name}
          </HoverText>
          {ad.location && (
            <>
              <Text greyMedium>{` › `}</Text>
              <HoverText
                onPress={() => {
                  navigation.navigate('AdsScreen', {
                    categoryIdentifier: ad.category.identifier,
                    mainCategoryIdentifier: ad.category.mainCategory.identifier,
                  });
                }}
                extraSmall
                greyMedium
              >
                {ad.category.name} - {ad.location.county}
              </HoverText>
              <Text greyMedium>{` › `}</Text>
              <HoverText
                onPress={() => {
                  navigation.navigate('AdsScreen', {
                    categoryIdentifier: ad.category.identifier,
                    mainCategoryIdentifier: ad.category.mainCategory.identifier,
                  });
                }}
                extraSmall
                greyMedium
              >
                {ad.category.name} - {ad.location.name}
              </HoverText>
            </>
          )}
        </View>
        <View style={styles.columns}>
          <View style={styles.mainContentContainer}>
            <View style={styles.imageContainer}>
              <View style={styles.titlePriceRow}>
                <Text
                  style={styles.title}
                  black
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {ad.name}
                </Text>
                <Text style={styles.title} black semiBold>
                  {formatPriceToString(ad.price)} {ad.currency}
                </Text>
              </View>
              <Text style={styles.createdAt} small greyMedium>
                {texts['published']}:{' '}
                {formatCreatedDateToString(new Date(ad.createdAt))}
              </Text>
              <ImageViewer images={ad.images || []} />
            </View>
            <View style={styles.descriptionContainer}>
              <Text large black semiBold>
                {texts['description']}
              </Text>
              <Text style={styles.descriptionText}>{ad.description}</Text>

              <Text large black semiBold>
                {texts['attributes']}
              </Text>
              <AdAttributeTable ad={ad} />
            </View>
          </View>
          <View style={styles.sideContainer}>
            <View style={styles.favoriteContainer}>
              <Text style={styles.favText} black large>
                {texts['markAsFavorite']}
              </Text>
              <AddFavoriteButton adId={ad.id} user={user} />
            </View>
            <View style={styles.userContainer}>
              <Text large black>
                {texts['sender']}
              </Text>
              <View style={styles.userNameImageContainer}>
                <Image style={styles.userProfilePic} source={profilePic} />
                <View style={styles.nameContainer}>
                  <Text medium black semiBold style={styles.userName}>
                    {ad.user.name}
                  </Text>

                  <Text extraSmall greyMedium>
                    {texts['lastActive']}: Tegnap
                  </Text>
                </View>
              </View>
              <View style={styles.callContainer}>
                <Button
                  style={styles.whatsAppBtn}
                  hoverStyle={styles.whatsAppBtnHover}
                  onPress={() => {}}
                >
                  <Icon
                    size={26}
                    style={styles.whatsappIcon}
                    color={Color.whiteColor}
                    name="whatsapp"
                  />
                  <Text white style={styles.whatsappText}>
                    {texts['writeOnWhatsapp']}
                  </Text>
                </Button>
                <Icon
                  color={Color.blackColor}
                  name="phone"
                  style={styles.whatsappIcon}
                />
                <Text small black>
                  {ad.user.phoneNumber}
                </Text>
              </View>
            </View>
            <View style={styles.locationContainer}>
              <Text style={styles.favText} medium black>
                {texts['location']}
              </Text>
              <View style={styles.locationRow}>
                <Icon name="location" size={24} />
                <View style={styles.locationTextContainer}>
                  <Text medium black semiBold>
                    {ad.location.name},{' '}
                  </Text>
                  <Text medium black>
                    {ad.location.county}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  breadcrumb: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'baseline',
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    maxWidth: maxContentWidth,
    width: '100%',
    marginTop: 27,
    marginBottom: 320,
  },
  columns: {
    flexDirection: 'row',
    width: '100%',
  },
  mainContentContainer: {
    width: 800,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  descriptionContainer: {
    width: '100%',
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    padding: 26,
  },
  sideContainer: {
    width: 416,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: Color.greyTextColor,
    marginTop: 12,
    marginBottom: 30,
  },

  userContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    paddingLeft: 26,
    paddingTop: 22,
    paddingBottom: 21,
    paddingRight: 37,
    marginBottom: 24,
  },
  imageContainer: {
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    padding: 23,
    marginBottom: 24,
  },
  favoriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: Color.whiteColor,
    width: '100%',
    minHeight: 55,
    paddingHorizontal: 23,
    paddingVertical: 14,
    marginBottom: 24,
  },
  locationContainer: {
    borderRadius: 6,
    backgroundColor: Color.whiteColor,
    paddingLeft: 26,
    paddingTop: 23,
    paddingBottom: 34,
  },
  locationRow: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTextContainer: {
    marginLeft: 8,
    flexDirection: 'row',
  },
  nameContainer: {
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  userName: {
    marginBottom: 2,
  },
  callContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatsAppBtn: {
    backgroundColor: '#41C352',
    height: 40,
    paddingRight: 23,
    paddingLeft: 14,
    marginRight: 28,
  },
  whatsAppBtnHover: {
    backgroundColor: '#00b82e',
  },
  whatsappIcon: {
    marginRight: 10,
  },
  whatsappText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  favText: {
    fontWeight: '500',
  },
  userNameImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 31,
    marginTop: 24,
  },
  userProfilePic: {
    width: 75,
    height: 75,
    borderRadius: 100,
    marginRight: 20,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    maxWidth: 520,
  },
  price: {
    fontSize: 24,
    lineHeight: 26,
  },
  createdAt: {
    marginTop: 3,
    marginBottom: 29,
  },
  attributesTable: {
    marginTop: 16,
    borderRadius: 6,
    flex: 1,
    overflow: 'hidden',
  },
  attributeRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 38,
  },
  attributeLabe: {
    width: '35%',
    fontSize: 15,
    lineHeight: 22,
    color: Color.greyTextColor,
  },
  attributeValue: {
    fontSize: 15,
    lineHeight: 22,
    color: Color.blackColor,
  },
  starIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  starFilled: {
    marginRight: 2.5,
    width: 20,
    height: 20,
  },
});
