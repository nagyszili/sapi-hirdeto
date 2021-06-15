import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { getFiltersAfterRemove, addRangeFilter } from '../../../utils';
import * as Color from '../../../utils/theme/colors';
import { Text } from '../../themed/Text';
import { RangeFilterProps } from './RangeFilter.props';

export const RangeFilter: React.FC<RangeFilterProps> = ({
  title,
  filters,
  label,
  labelStyle,
}) => {
  const navigation = useNavigation();

  const filter = filters && filters.find((filter) => filter.name === title);

  const [from, setFrom] = useState(filter?.from?.toString() || '');
  const [to, setTo] = useState(filter?.to?.toString() || '');

  useEffect(() => {
    setFrom(filter?.from?.toString().replace(/[^0-9]/g, '') || '');
    setTo(filter?.to?.toString().replace(/[^0-9]/g, '') || '');
  }, [filter?.from, filter?.to]);

  useEffect(() => {
    if (from === '' && to === '' && filter) {
      navigation.setParams({
        filters: getFiltersAfterRemove(title, filters),
      });
    }
    if (from || to) {
      navigation.setParams({
        filters: addRangeFilter(title, from, to, filters, filter),
      });
    }
  }, [from, to]);

  return (
    <View>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={styles.filters}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={texts['min']}
            placeholderTextColor="#969696b3"
            style={styles.input}
            value={from}
            onChangeText={(from) => setFrom(from.replace(/[^0-9]/g, ''))}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.spacer} />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder={texts['max']}
            placeholderTextColor="#969696b3"
            style={styles.input}
            value={to}
            onChangeText={(to) => setTo(to.replace(/[^0-9]/g, ''))}
            keyboardType="number-pad"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  label: {
    fontSize: 17,
    color: Color.blackColor,
    marginBottom: 7,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 46,
    flex: 1,
    paddingHorizontal: 8,
    borderColor: Color.greyColor,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: Color.whiteColor,
  },
  input: {
    width: '100%',
  },
  spacer: {
    width: 16,
  },
  icon: {
    backgroundColor: Color.whiteColor,
    justifyContent: 'center',
  },
});
