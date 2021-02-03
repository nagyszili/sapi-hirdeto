import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

import { Filter } from '../apollo/types/graphql-global-types';
import { ATTRIBUTE_TYPES } from '../utils/constants';

interface Props {
  title: string;
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

export const RangeFilter: React.FC<Props> = ({ setFilters, title }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    if (from === '' && to === '') {
      setFilters((oldFilters) =>
        oldFilters.filter((filter) => filter.name !== title),
      );
    } else {
      setFilters((oldFilters) =>
        oldFilters.find((filter) => filter.name === title)
          ? oldFilters.map((filter) =>
              filter.name === title
                ? {
                    type: filter.type,
                    name: filter.name,
                    from: parseInt(from, 10),
                    to: parseInt(to, 10),
                  }
                : filter,
            )
          : [
              ...oldFilters,
              {
                type: ATTRIBUTE_TYPES.RANGE,
                name: title,
                from: parseInt(from, 10),
                to: parseInt(to, 10),
              },
            ],
      );
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
