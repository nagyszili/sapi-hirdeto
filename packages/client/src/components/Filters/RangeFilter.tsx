import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import { useHover } from 'react-native-web-hooks';

import texts from '../../../assets/texts/texts.json';
import { Filter } from '../../apollo/types/graphql-global-types';
import { Text } from '../../components/themed/Text';
import { getFiltersAfterRemove, addRangeFilter } from '../../utils';
import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';

interface Props {
  title: string;
  label?: string;
  filters?: Filter[];
}

export const RangeFilter: React.FC<Props> = ({ title, filters, label }) => {
  const navigation = useNavigation();

  const filter = filters && filters.find((filter) => filter.name === title);

  const refLeft = useRef(null);
  const refRight = useRef(null);

  const leftHovered = useHover(refLeft);
  const rightHovered = useHover(refRight);

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
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.filters}>
        <View ref={refLeft} style={styles.inputContainer}>
          <TextInput
            placeholder={texts['min']}
            placeholderTextColor="#969696b3"
            style={styles.input}
            value={from}
            onChangeText={(from) => setFrom(from.replace(/[^0-9]/g, ''))}
          />
          {leftHovered && from !== '' && (
            <Pressable style={styles.icon} onPress={() => setFrom('')}>
              <Icon name="close" color={Color.errorColor} size={20} />
            </Pressable>
          )}
        </View>
        <View style={styles.spacer} />

        <View ref={refRight} style={styles.inputContainer}>
          <TextInput
            placeholder={texts['max']}
            placeholderTextColor="#969696b3"
            style={styles.input}
            value={to}
            onChangeText={(to) => setTo(to.replace(/[^0-9]/g, ''))}
          />
          {rightHovered && to !== '' && (
            <Pressable style={styles.icon} onPress={() => setTo('')}>
              <Icon name="close" color={Color.errorColor} size={22} />
            </Pressable>
          )}
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
    fontSize: 15,
    color: Color.greyDarkColor,
    marginBottom: 7,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 46,
    width: 132,
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
    width: 6,
  },
  icon: {
    backgroundColor: Color.whiteColor,
    justifyContent: 'center',
  },
});
