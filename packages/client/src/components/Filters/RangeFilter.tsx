import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import { Filter } from '../../apollo/types/graphql-global-types';
import { Text } from '../../components/themed/Text';
import { getFiltersAfterRemove, addRangeFilter } from '../../utils';

interface Props {
  title: string;
  filters?: Filter[];
}

export const RangeFilter: React.FC<Props> = ({ title, filters }) => {
  const navigation = useNavigation();

  const filter = filters && filters.find((filter) => filter.name === title);

  const [from, setFrom] = useState(filter?.from?.toString() || '');
  const [to, setTo] = useState(filter?.to?.toString() || '');

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
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.filters}>
        <TextInput
          placeholder="From"
          style={styles.inputStyle}
          value={from}
          onChangeText={(from) => setFrom(from.replace(/[^0-9]/g, ''))}
        />
        <TextInput
          placeholder="To"
          style={styles.inputStyle}
          value={to}
          onChangeText={(to) => setTo(to.replace(/[^0-9]/g, ''))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  inputStyle: {
    marginVertical: 5,
    marginHorizontal: 10,
    height: 40,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderRadius: 6,
  },
  submit: {
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderRadius: 6,
  },
});
