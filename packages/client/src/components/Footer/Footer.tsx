import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { showLoginModal } from '../../apollo/ui/modalMutations';
import { ImageComponent } from '../../utils/images';
import { greyColor, whiteColor } from '../../utils/theme/colors';
import { maxContentWidth } from '../../utils/theme/layout';
import { HoverText } from '../themed/HoverText';
import { Text } from '../themed/Text';

export const Footer: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topContent}>
          <View>
            <ImageComponent name="piacter" style={styles.logo} />
            <Text style={styles.descriptionText}>
              {texts['footerDescription']}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnTitle} black>
              {texts['aboutWeb']}
            </Text>
            <HoverText style={styles.columnText} greyDark>
              {texts['mission']}
            </HoverText>
            <HoverText style={styles.columnText} greyDark>
              {texts['termsAndConditionsFooter']}
            </HoverText>
            <HoverText style={styles.columnText} greyDark>
              {texts['privacyPolicy']}
            </HoverText>
            <HoverText style={styles.columnText} greyDark>
              {texts['career']}
            </HoverText>
          </View>

          <View style={styles.column}>
            <Text style={styles.columnTitle} black>
              {texts['myProfile']}
            </Text>
            <HoverText
              style={styles.columnText}
              greyDark
              onPress={() => showLoginModal()}
            >
              {texts['login']}
            </HoverText>
            <HoverText
              style={styles.columnText}
              greyDark
              onPress={() => showLoginModal({ isRegister: true })}
            >
              {texts['registration']}
            </HoverText>
            <HoverText style={styles.columnText} greyDark>
              {texts['myAds']}
            </HoverText>
            <HoverText style={styles.columnText} greyDark>
              {texts['setting']}
            </HoverText>
          </View>

          <View style={styles.column}>
            <Text style={styles.columnTitle} black>
              {texts['help']}
            </Text>
            <HoverText style={styles.columnText} greyDark>
              {texts['contact']}
            </HoverText>
            <HoverText style={styles.columnText} greyDark>
              {texts['faq']}
            </HoverText>
          </View>

          <View style={styles.column}>
            <Text style={styles.columnTitle} black>
              {texts['mobileApps']}
            </Text>
            <ImageComponent name="appStore" style={styles.getApp} />
            <ImageComponent name="playStore" style={styles.getApp} />
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.bottomBar}>
          <View>
            <Text style={[styles.bottomBarText, styles.marginRight]} greyMedium>
              {texts['original']}
            </Text>
          </View>

          <View style={styles.bottomBarRight}>
            <Text style={[styles.bottomBarText, styles.marginRight]} greyMedium>
              {texts['contactEmail']}
            </Text>
            <Text style={[styles.bottomBarText, styles.marginRight]} greyMedium>
              {texts['contactPhone']}
            </Text>
            <Text style={styles.bottomBarText} greyMedium>
              {texts['contactAddress']}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: maxContentWidth,
    marginTop: 38,
    marginBottom: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContent: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    marginLeft: -10,
    marginBottom: 7,
    height: 50,
    width: 130,
  },
  descriptionText: {
    maxWidth: 300,
    fontSize: 15,
    lineHeight: 22,
    color: '#545454',
  },
  column: {
    marginHorizontal: 36,
  },
  columnTitle: {
    fontSize: 15,
    lineHeight: 22,
    marginVertical: 10,
  },
  columnText: {
    fontSize: 15,
    lineHeight: 22,
    marginVertical: 5,
  },
  getApp: {
    width: 111,
    height: 38,
    borderRadius: 6,
    marginVertical: 5,
  },

  line: {
    width: '100%',
    height: 1,
    backgroundColor: greyColor,
    marginVertical: 20,
  },
  bottomBar: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomBarText: {
    fontSize: 13,
    lineHeight: 18,
  },
  marginRight: {
    marginRight: 20,
  },
  bottomBarRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
