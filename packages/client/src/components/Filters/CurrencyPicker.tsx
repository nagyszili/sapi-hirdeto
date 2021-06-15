import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  TextStyle,
  StyleProp,
} from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { updateCurrency } from '../../apollo/filters/updateCurrency';
import { currencyVar } from '../../apollo/reactiveVariables';
import { Text } from '../../components/themed/Text';
import { CURRENCY } from '../../utils/constants';
import * as Color from '../../utils/theme/colors';
interface Props {
  labelStyle?: StyleProp<TextStyle>;
}

export const CurrencyPicker: React.FC<Props> = ({ labelStyle }) => {
  const activeCurrency = useReactiveVar(currencyVar);

  const isLeiActive = () => activeCurrency === CURRENCY.LEI;
  const isEuroActive = () => activeCurrency === CURRENCY.EURO;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{texts['currency']}:</Text>
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 146,
    height: 46,
  },
  label: {
    marginRight: 12,
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
    fontWeight: '500',
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
    borderColor: Color.errorColor,
  },
  line: {
    height: '100%',
    width: 1,
    backgroundColor: Color.errorColor,
  },
});
