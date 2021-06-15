import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable } from 'react-native';

import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';

interface Props {
  searchString?: string;
  search?: (query: string) => void;
  placeholder?: string;
}

export const SearchBarDarkComponent: React.FC<Props> = ({
  searchString,
  search,
  placeholder,
}) => {
  const [queryString, setQueryString] = useState(searchString || '');

  return (
    <View style={styles.searchBar}>
      <Icon name="search" color="rgba(0, 0, 0, 0.5)" size={24} />
      <TextInput
        style={styles.input}
        value={queryString}
        onChangeText={setQueryString}
        placeholder={placeholder}
        placeholderTextColor="rgba(88, 87, 87, 0.75)"
        onSubmitEditing={() => search && search(queryString)}
        returnKeyType="search"
      />
      {queryString !== '' && (
        <Pressable
          onPress={() => {
            setQueryString('');
          }}
        >
          <Icon name="close" color="#424242" size={24} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Color.greyColor,
    flex: 1,
    height: 44,
    borderRadius: 6,
  },
  input: {
    flex: 1,
    fontSize: 15,
    marginHorizontal: 10,
    height: '100%',
    color: Color.blackColor,
  },
});
