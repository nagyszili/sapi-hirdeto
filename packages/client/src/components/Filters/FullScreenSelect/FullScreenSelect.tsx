import { useRoute, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';

import { FullScreenSelectRouteProp } from '../../../navigation/types';
import * as Color from '../../../utils/theme/colors';
import { Text } from '../../themed/Text';
import { Element } from '../Select/SelectInput.props';

export const FullScreenSelect: React.FC<{}> = () => {
  const navigation = useNavigation();
  const route = useRoute<FullScreenSelectRouteProp>();
  const { elements, selectedElement, setSelectedElement, label } = route.params;
  React.useEffect(() => {
    navigation.setOptions({ title: label });
  }, [label]);

  const isSelected = (item: Element) =>
    JSON.stringify(selectedElement) === JSON.stringify(item.value);

  const renderItem = (item: Element, index: number) => {
    return (
      <Pressable
        key={index}
        style={[
          styles.item,
          isSelected(item) && { backgroundColor: Color.greyLightColor },
        ]}
        onPress={() => {
          setSelectedElement(item.value);
          navigation.goBack();
        }}
      >
        <Text greyDark medium>
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={elements}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item, index) => item.label + index}
        initialNumToRender={25}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.whiteColor,
  },
  item: {
    backgroundColor: Color.whiteColor,
    height: 46,
    paddingHorizontal: 10,
    borderBottomColor: Color.greyColor,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
});
