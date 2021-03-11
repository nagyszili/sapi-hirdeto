import * as React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { updateCurrency } from '../../apollo/filters/updateCurrency';
import { useActiveCurrency } from '../../apollo/filters/useActiveCurrency';
import { Text } from '../../components/themed/Text';
import { CURRENCY } from '../../utils/constants';

export const CurrencyPicker: React.FC<{}> = () => {
  const { data: currency } = useActiveCurrency();
  const isLeiActive = () =>
    currency?.currency === CURRENCY.LEI ? styles.active : undefined;

  const isEuroActive = () =>
    currency?.currency === CURRENCY.EURO ? styles.active : undefined;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          updateCurrency(CURRENCY.LEI);
        }}
      >
        <Text style={isLeiActive()}>{texts['lei']}</Text>
      </Pressable>

      <View style={styles.spacer} />
      <Pressable
        onPress={() => {
          updateCurrency(CURRENCY.EURO);
        }}
      >
        <Text style={isEuroActive()}>{texts['euro']}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    width: 200,
    height: 50,
  },
  spacer: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(219, 219, 219, 1)',
  },
  active: {
    fontWeight: 'bold',
  },
});
