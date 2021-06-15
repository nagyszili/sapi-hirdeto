import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { CSSProperties } from 'react';
import { View, StyleSheet, Image, Pressable, Linking } from 'react-native';

import profilePic from '../../../../assets/images/defaultProfilePicture.png';
import texts from '../../../../assets/texts/texts.json';
import { AdAttributeTable } from '../../../components/AdAttributeTable/AdAttributeTable';
import { AddFavoriteButton } from '../../../components/Buttons/AddFavoriteButton';
import { Button } from '../../../components/Buttons/Button';
import { FloatingActionButton } from '../../../components/Buttons/FloatingActionButton';
import { ImageViewer } from '../../../components/ImageViewer';
import { Text } from '../../../components/themed/Text';
import {
  formatCreatedDateToString,
  formatPriceToString,
  shareAdOnFacebook,
} from '../../../utils';
import { STATUS } from '../../../utils/constants';
import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';
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
  return (
    <View>
      <ImageViewer images={ad.images || []} />

      <LinearGradient
        colors={[Color.secondaryColor, Color.primaryColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.gradientLine} />
      </LinearGradient>

      <View style={styles.titleContainer}>
        <Text style={styles.createdAtText} extraSmall greyMedium>
          {texts['published']}:{' '}
          {formatCreatedDateToString(new Date(ad.createdAt))}
        </Text>
        <Text large black>
          {ad.name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text extraLarge black semiBold>
            {formatPriceToString(ad.price)}{' '}
            {texts[ad.currency as keyof typeof texts]}
          </Text>
          {ad.negotiable && (
            <Text style={styles.negotiableText} extraSmall greyMedium>
              {texts.trueNegotiable}
            </Text>
          )}
        </View>
      </View>

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
            <Text style={styles.favText} black large semiBold>
              {texts['edit']}
            </Text>
            <Icon name="edit" size={22} />
          </Pressable>
          <Pressable onPress={deleteAd} style={styles.dashContainer}>
            <Text style={[styles.favText, { color: Color.errorColor }]} large>
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
              <Icon name="remove" size={22} color={Color.inactivateAdColor} />
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
              <Icon name="check" size={22} color={Color.activateAdColor} />
            </Pressable>
          )}

          <Pressable
            onPress={() => actualizeAd()}
            style={styles.dashContainer}
            disabled={canActualize()}
          >
            <Text
              style={[styles.containerTitle, { color: Color.activateAdColor }]}
              large
            >
              {texts.actualize}
            </Text>
            <Icon name="clock" size={22} color={Color.activateAdColor} />
          </Pressable>
        </>
      ) : (
        <View style={styles.dashContainer}>
          <Text style={styles.favText} black semiBold>
            {texts['markAsFavorite']}
          </Text>
          <AddFavoriteButton adId={ad.id} user={user} />
        </View>
      )}

      <Pressable
        onPress={() =>
          shareAdOnFacebook({ adName: ad.name, adIdentifier: ad.identifier })
        }
        style={styles.dashContainer}
      >
        <Text style={[styles.favText, { color: Color.facebookColor }]} large>
          {texts['shareOnFacebook']}
        </Text>
        <Icon
          name="facebook"
          size={22}
          style={styles.fbIcon}
          color={Color.facebookColor}
        />
      </Pressable>

      <View style={styles.smallContainer}>
        <Text style={styles.containerTitle} black semiBold>
          {texts['description']}
        </Text>

        <Text style={styles.descriptionText}>{ad.description}</Text>
      </View>

      {ad?.attributeValues && ad?.attributeValues.length > 0 && (
        <View style={styles.smallContainer}>
          <Text style={styles.containerTitle} black semiBold>
            {texts['attributes']}
          </Text>
          <AdAttributeTable ad={ad} />
        </View>
      )}

      {!isAdBelongsToUser && (
        <View style={styles.smallContainer}>
          <Text style={styles.containerTitle} black semiBold>
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
            <Button
              style={styles.whatsAppBtn}
              hoverStyle={styles.whatsAppBtnHover}
              onPress={() =>
                Linking.openURL(`https://wa.me/+40${ad.user.phoneNumber}`)
              }
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
            <Pressable
              style={styles.callUser}
              onPress={() => Linking.openURL(`tel:+40${ad.user.phoneNumber}`)}
            >
              <Icon
                color={Color.blackColor}
                name="phone"
                style={styles.whatsappIcon}
              />
              <Text small black>
                {ad.user.phoneNumber}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
      {!isAdBelongsToUser && (
        <Pressable
          onPress={() =>
            navigation.navigate('AdsScreen', { creatorId: ad.user.id })
          }
        >
          <View style={styles.dashContainer}>
            <Text black large>
              {texts.advertisersAds}
            </Text>
            <Icon name="arrow-right" />
          </View>
        </Pressable>
      )}

      <View style={styles.smallContainer}>
        <Text style={styles.containerTitle} black semiBold>
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

      <View style={styles.smallContainer}>
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

      {!isAdBelongsToUser && (
        <div style={customStyle}>
          <FloatingActionButton
            onPress={() =>
              Linking.openURL(`https://wa.me/+40${ad.user.phoneNumber}`)
            }
          />
        </div>
      )}
    </View>
  );
};

const customStyle: CSSProperties = {
  position: 'fixed',
  bottom: 30,
  right: 30,
  zIndex: 99999,
};

const styles = StyleSheet.create({
  gradientLine: {
    width: '100%',
    height: 5,
  },
  imageItem: {
    width: '100%',
    height: 311,
  },
  titleContainer: {
    paddingTop: 8,
    paddingLeft: 20,
    paddingBottom: 15,
    paddingRight: 30,
    marginBottom: 6,
    backgroundColor: Color.whiteColor,
  },
  createdAtText: {
    marginBottom: 4,
  },
  dashContainer: {
    borderRadius: 6,
    marginVertical: 6,
    paddingTop: 12,
    paddingLeft: 20,
    paddingBottom: 15,
    paddingRight: 20,
    backgroundColor: Color.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favText: {
    fontSize: 17,
    fontWeight: '500',
  },
  fbIcon: {
    padding: 5,
  },
  favIconContainer: {
    height: '100%',
    justifyContent: 'center',
    marginRight: 20,
  },
  smallContainer: {
    marginVertical: 6,
    paddingTop: 24,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20,
    backgroundColor: Color.whiteColor,
  },
  containerTitle: {
    fontSize: 17,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: Color.greyTextColor,
    lineHeight: 22,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 8,
    flexDirection: 'row',
  },
  paginationContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -15,
    backgroundColor: 'transparent',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 0,
    padding: 0,
    backgroundColor: Color.whiteColor,
  },
  paginationInactiveDot: {
    backgroundColor: Color.whiteColor,
    margin: 0,
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
  nameContainer: {
    justifyContent: 'center',
    flex: 1,
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
  callUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  headerSafeContainer: {
    backgroundColor: '#fff',
    height: '90%',
    width: '100%',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  shadowBottomContainer: {
    backgroundColor: 'transparent',
    height: '10%',
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Color.greyLightColor,
    width: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    top: 10,
    zIndex: 99999,
  },
  image: {
    flex: 1,
    backgroundColor: Color.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 100,
  },

  negotiableText: {
    marginLeft: 'auto',
    marginTop: 3,
    marginBottom: 29,
  },
});
