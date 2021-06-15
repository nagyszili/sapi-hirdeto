import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';

import profilePic from '../../../../assets/images/defaultProfilePicture.png';
import texts from '../../../../assets/texts/texts.json';
import { AdByIdentifier_findAdByIdentifier } from '../../../apollo/types/AdByIdentifier';
import { AdAttributeTable } from '../../../components/AdAttributeTable/AdAttributeTable';
import { AddFavoriteButton } from '../../../components/Buttons/AddFavoriteButton';
import { Footer } from '../../../components/Footer/Footer.web';
import { GradientHeader } from '../../../components/Headers/GradientHeader.web';
import { ImageViewer } from '../../../components/ImageViewer';
import { HoverText } from '../../../components/themed/HoverText';
import { Text } from '../../../components/themed/Text';
import {
  formatCreatedDateToString,
  formatPriceToString,
  shareAdOnFacebook,
} from '../../../utils';
import { STATUS } from '../../../utils/constants';
import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';
import { maxContentWidth, globalPadding } from '../../../utils/theme/layout';
import { AdDetailsComponentProps } from './AdDetailsComponent.props';

export const AdDetailsComponent: React.FC<AdDetailsComponentProps> = ({
  ad,
  user,
  isAdBelongsToUser,
  setAdStatus,
  actualizeAd,
  canActualize,
  deleteAd,
}) => {
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({ title: ad.name });
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <GradientHeader />
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
                    location: {
                      type: 'county',
                      name: ad.location.county,
                    },
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
                    location: {
                      type: 'location',
                      name: ad.location.name,
                      county: ad.location.county,
                    },
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
                  {formatPriceToString(ad.price)}{' '}
                  {texts[ad.currency as keyof typeof texts]}
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.createdAt} small greyMedium>
                  {texts['published']}:{' '}
                  {formatCreatedDateToString(new Date(ad.createdAt))}
                </Text>

                {ad.negotiable && (
                  <Text style={styles.negotiableText} small greyMedium>
                    {texts.trueNegotiable}
                  </Text>
                )}
              </View>

              <ImageViewer images={ad.images || []} />
            </View>
            <View style={styles.descriptionContainer}>
              <Text large black semiBold>
                {texts['description']}
              </Text>
              <Text style={styles.descriptionText}>{ad.description}</Text>

              {ad?.attributeValues && ad?.attributeValues.length > 0 && (
                <>
                  <Text large black semiBold>
                    {texts['attributes']}
                  </Text>
                  <AdAttributeTable ad={ad} />
                </>
              )}
            </View>
          </View>
          <View style={styles.sideContainer}>
            {isAdBelongsToUser ? (
              <>
                <Pressable
                  onPress={() =>
                    navigation.navigate('UpdateAdScreen', {
                      identifier: ad.identifier,
                    })
                  }
                  style={styles.dashContainer}
                >
                  <Text style={styles.containerTitle} black large>
                    {texts['edit']}
                  </Text>
                  <Icon name="edit" size={22} />
                </Pressable>
                <Pressable onPress={deleteAd} style={styles.dashContainer}>
                  <Text
                    style={[styles.containerTitle, { color: Color.errorColor }]}
                    large
                  >
                    {texts['deleteAd']}
                  </Text>
                  <Icon name="delete" size={22} color={Color.errorColor} />
                </Pressable>
                {ad.status === 'active' ? (
                  <Pressable
                    onPress={() => setAdStatus(STATUS.INACTIVE)}
                    style={styles.dashContainer}
                  >
                    <Text
                      style={[
                        styles.containerTitle,
                        { color: Color.inactivateAdColor },
                      ]}
                      large
                    >
                      {texts.inactivate}
                    </Text>
                    <Icon
                      name="remove"
                      size={22}
                      color={Color.inactivateAdColor}
                    />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => setAdStatus(STATUS.ACTIVE)}
                    style={styles.dashContainer}
                  >
                    <Text
                      style={[
                        styles.containerTitle,
                        { color: Color.activateAdColor },
                      ]}
                      large
                    >
                      {texts.activate}
                    </Text>
                    <Icon
                      name="check"
                      size={22}
                      color={Color.activateAdColor}
                    />
                  </Pressable>
                )}

                <Pressable
                  onPress={() => actualizeAd()}
                  style={styles.dashContainer}
                  disabled={!canActualize()}
                >
                  <Text
                    style={[
                      styles.containerTitle,
                      { color: Color.activateAdColor },
                    ]}
                    large
                  >
                    {texts.actualize}
                  </Text>
                  <Icon name="clock" size={22} color={Color.activateAdColor} />
                </Pressable>

                <ShareComponent ad={ad} />
              </>
            ) : (
              <>
                <View style={styles.dashContainer}>
                  <Text style={styles.containerTitle} black large>
                    {texts['markAsFavorite']}
                  </Text>
                  <AddFavoriteButton adId={ad.id} user={user} />
                </View>
                <ShareComponent ad={ad} />
                <View style={styles.userContainer}>
                  <Text large black>
                    {texts['sender']}
                  </Text>
                  <View style={styles.userNameImageContainer}>
                    <Image
                      style={styles.userProfilePic}
                      source={ad.user.profilePictureUrl || profilePic}
                    />
                    <View style={styles.nameContainer}>
                      <Text medium black semiBold style={styles.userName}>
                        {ad.user.name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.callContainer}>
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
              </>
            )}

            {!isAdBelongsToUser && (
              <Pressable
                onPress={() => {
                  navigation.navigate('AdsScreen', { creatorId: ad.user.id });
                }}
              >
                <View style={styles.dashContainer}>
                  <Text style={styles.containerTitle} black large>
                    {texts.advertisersAds}
                  </Text>
                  <Icon name="arrow-right" />
                </View>
              </Pressable>
            )}

            <View style={styles.informationsContainer}>
              <Text style={styles.containerTitle} medium black>
                {texts['location']}
              </Text>
              <View style={styles.containerRow}>
                <Icon name="location" size={24} />
                <View style={styles.textContainer}>
                  <Text medium black semiBold>
                    {ad.location.name},{' '}
                  </Text>
                  <Text medium black>
                    {ad.location.county}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.informationsContainer}>
              <Text style={styles.containerTitle} medium black>
                {texts.views}
              </Text>
              <View style={styles.containerRow}>
                <Icon name="visibility" size={24} color={Color.blackColor} />

                <View style={styles.textContainer}>
                  <Text medium black semiBold>
                    {ad.views}{' '}
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

const ShareComponent: React.FC<{ ad: AdByIdentifier_findAdByIdentifier }> = ({
  ad,
}) => (
  <Pressable
    onPress={() =>
      shareAdOnFacebook({ adName: ad.name, adIdentifier: ad.identifier })
    }
    style={styles.dashContainer}
  >
    <Text style={[styles.containerTitle, { color: Color.facebookColor }]} large>
      {texts['shareOnFacebook']}
    </Text>
    <Icon
      name="facebook"
      size={22}
      style={styles.fbIcon}
      color={Color.facebookColor}
    />
  </Pressable>
);

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
    paddingHorizontal: globalPadding,
    width: '100%',
    marginTop: 27,
    marginBottom: 320,
  },
  columns: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    flexWrap: 'wrap',
  },
  mainContentContainer: {
    minWidth: 630,
    maxWidth: 900,
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
    marginBottom: 24,
  },
  descriptionContainer: {
    width: '100%',
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    padding: 26,
  },
  sideContainer: {
    maxWidth: 900,
    flex: 1,
    minWidth: 250,
    marginRight: 24,
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
    width: '100%',
    backgroundColor: Color.whiteColor,
    borderRadius: 6,
    padding: 23,
    marginBottom: 24,
  },
  dashContainer: {
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
  informationsContainer: {
    borderRadius: 6,
    backgroundColor: Color.whiteColor,
    paddingLeft: 26,
    paddingTop: 23,
    paddingBottom: 34,
    marginBottom: 24,
  },
  containerRow: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 8,
    flexDirection: 'row',
    overflow: 'hidden',
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
    justifyContent: 'center',
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
  containerTitle: {
    fontWeight: '500',
  },
  fbIcon: {
    padding: 5,
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
    borderColor: Color.greyColor,
    borderWidth: 1,
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
    alignSelf: 'flex-start',
  },
  negotiableText: {
    marginLeft: 'auto',
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
