import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { updateCurrency } from '../apollo/filters/updateCurrency';
import { useActiveCurrency } from '../apollo/filters/useActiveCurrency';
import { CURRENCY } from '../utils/constants';

export const CurrencyPicker: React.FC<{}> = () => {
  const { data: currency } = useActiveCurrency();
  const isLeiActive = () =>
    currency?.currency === CURRENCY.LEI ? styles.active : undefined;

  const isEuroActive = () =>
    currency?.currency === CURRENCY.EURO ? styles.active : undefined;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          updateCurrency(CURRENCY.LEI);
        }}
      >
        <Text style={isLeiActive()}>LEI</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          updateCurrency(CURRENCY.EURO);
        }}
      >
        <Text style={isEuroActive()}>EURO</Text>
      </TouchableOpacity>
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
