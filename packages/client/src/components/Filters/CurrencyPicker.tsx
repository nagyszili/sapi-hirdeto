import * as React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { updateCurrency } from '../../apollo/filters/updateCurrency';
import { useActiveCurrency } from '../../apollo/filters/useActiveCurrency';
import { Text } from '../../components/themed/Text';
import { CURRENCY } from '../../utils/constants';
import * as Color from '../../utils/theme/colors';

export const CurrencyPicker: React.FC<{}> = () => {
  const { data: currency } = useActiveCurrency();

  const isLeiActive = () => currency?.currency === CURRENCY.LEI;
  const isEuroActive = () => currency?.currency === CURRENCY.EURO;

  return (
    <View>
      <Text style={styles.label}>{texts['currency']}</Text>
      <View style={styles.picker}>
        <Pressable
          style={[styles.left, isLeiActive() && styles.active]}
          onPress={() => {
            updateCurrency(CURRENCY.LEI);
          }}
        >
          <Text style={isLeiActive() ? styles.activeText : styles.inactiveText}>
            {texts['picker.ron']}
          </Text>
        </Pressable>
        <View style={styles.line} />
        <Pressable
          style={[styles.right, isEuroActive() && styles.active]}
          onPress={() => {
            updateCurrency(CURRENCY.EURO);
          }}
        >
          <Text
            style={isEuroActive() ? styles.activeText : styles.inactiveText}
          >
            {texts['picker.euro']}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 146,
    height: 46,
  },
  label: {
    marginBottom: 7,
    fontSize: 15,
    color: Color.greyDarkColor,
  },
  inactiveText: {
    fontSize: 15,
    lineHeight: 22,
    color: Color.greyMediumColor,
  },
  activeText: {
    fontSize: 15,
    lineHeight: 22,
    color: Color.greyDarkColor,
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    backgroundColor: Color.whiteColor,
    borderColor: Color.greyColor,
    borderRightWidth: 0,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    backgroundColor: Color.whiteColor,
    borderColor: Color.greyColor,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderLeftWidth: 0,
  },
  active: {
    borderColor: Color.primaryLightColor,
  },
  inactive: {
    borderColor: Color.primaryLightColor,
  },
  line: {
    height: '100%',
    width: 1,
    backgroundColor: Color.primaryLightColor,
  },
});
