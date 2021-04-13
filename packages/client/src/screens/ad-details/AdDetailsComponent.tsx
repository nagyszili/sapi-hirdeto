import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  Linking,
  SafeAreaView,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import profilePic from '../../../assets/images/defaultProfilePicture.png';
import texts from '../../../assets/texts/texts.json';
import { AdAttributeTable } from '../../components/AdAttributeTable/AdAttributeTable';
import { AddFavoriteButton } from '../../components/Buttons/AddFavoriteButton';
import { Button } from '../../components/Buttons/Button';
import { FloatingActionButton } from '../../components/Buttons/FloatingActionButton';
import { HeaderBackButton } from '../../components/Buttons/HeaderBackButton';
import { Text } from '../../components/themed/Text';
import ParallaxScrollView from '../../lib/parallax-header/ParallaxScrollView';
import { formatCreatedDateToString } from '../../utils';
import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';
import { AdDetailsComponentProps } from './AdDetailsComponent.props';

const { width: screenWidth } = Dimensions.get('window');

export const AdDetailsComponent: React.FC<AdDetailsComponentProps> = ({
  ad,
  user,
}) => {
  const [, setIsHeaderVisible] = useState<boolean>(true);

  const scrollViewReference = useRef<ScrollView>(
    null
  ) as React.MutableRefObject<ScrollView>;

  const notchSizes = useSafeAreaInsets();

  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = ad.images
    ? [...ad.images]
        .sort((a, b) => a.priority - b.priority)
        .map((image) => ({ url: image.url }))
    : [];

  const carouselItems: any = images.map((image) => image.url);

  const renderItem = ({ item }: any) => {
    return (
      <Pressable onPress={() => setIsVisible(true)} style={styles.imageItem}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{ uri: item }}
        />
      </Pressable>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.backButtonContainer}>
        <HeaderBackButton />
      </SafeAreaView>
      <ParallaxScrollView
        onChangeHeaderVisibility={(a: number) => setIsHeaderVisible(a < 50)}
        fadeOutBackground={false}
        fadeOutForeground={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollViewRef={scrollViewReference}
        parallaxHeaderHeight={311}
        backgroundColor="transparent"
        renderContentBackground={() => {}}
        stickyHeaderHeight={50 + notchSizes.top}
        renderFixedHeader={() => {}}
        renderStickyHeader={() => (
          <>
            <SafeAreaView style={styles.headerSafeContainer}>
              <View style={styles.headerContainer}>
                {/* <View style={styles.favIconContainer}>
                  <AddFavoriteButton adId={ad.id} favorite={favorite} />
                </View> */}
              </View>
            </SafeAreaView>
            <View style={styles.shadowBottomContainer} />
          </>
        )}
        renderForeground={() => (
          <View>
            <Carousel
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              data={carouselItems}
              renderItem={renderItem}
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth}
              onSnapToItem={setActiveIndex}
              initialNumToRender={5}
            />
            <Pagination
              dotsLength={carouselItems.length}
              activeDotIndex={activeIndex}
              containerStyle={styles.paginationContainer}
              dotStyle={styles.paginationDot}
              inactiveDotStyle={styles.paginationInactiveDot}
              inactiveDotOpacity={0.35}
              inactiveDotScale={0.8}
            />
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
      >
        <Modal visible={isVisible}>
          <ImageViewer
            imageUrls={images}
            enableSwipeDown
            enablePreload
            swipeDownThreshold={100}
            onSwipeDown={() => setIsVisible(false)}
            onLongPress={() => {}}
            saveToLocalByLongPress={false}
          />
        </Modal>

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
          <Text extraLarge black semiBold>
            {ad.price} {ad.currency}
          </Text>
        </View>

        <View style={styles.favContainer}>
          <Text style={styles.favText} black semiBold>
            {texts['markAsFavorite']}
          </Text>
          <AddFavoriteButton adId={ad.id} user={user} />
        </View>

        <View style={styles.smallContainer}>
          <Text style={styles.containerTitle} black semiBold>
            {texts['description']}
          </Text>

          <Text style={styles.descriptionText}>{ad.description}</Text>
        </View>

        <View style={styles.smallContainer}>
          <Text style={styles.containerTitle} black semiBold>
            {texts['attributes']}
          </Text>
          <AdAttributeTable ad={ad} />
        </View>

        <View style={styles.smallContainer}>
          <Text style={styles.containerTitle} black semiBold>
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

        <View style={styles.smallContainer}>
          <Text style={styles.containerTitle} black semiBold>
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
      </ParallaxScrollView>
      <FloatingActionButton
        style={styles.fab}
        onPress={() =>
          Linking.openURL(`https://wa.me/+40${ad.user.phoneNumber}`)
        }
      />
    </>
  );
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
  favContainer: {
    height: 60,
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
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTextContainer: {
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
    top: 30,
    zIndex: 99999,
  },
});
