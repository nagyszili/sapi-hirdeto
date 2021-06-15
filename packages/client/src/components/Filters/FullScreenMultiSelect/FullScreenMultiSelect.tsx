import { useRoute, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';

import { FullScreenMultiSelectRouteProp } from '../../../navigation/types';
import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';
import { Text } from '../../themed/Text';
import { Element } from '../Select/SelectInput.props';

export const FullScreenMultiSelect: React.FC<{}> = () => {
  const navigation = useNavigation();
  const route = useRoute<FullScreenMultiSelectRouteProp>();
  const { elements, selectedElements, setSelectedElements, label } =
    route.params;

  const [selectedElementsState, setSelectedElementsState] =
    React.useState(selectedElements);

  React.useEffect(() => {
    setSelectedElements(selectedElementsState);
  }, [selectedElementsState]);

  React.useEffect(() => {
    navigation.setOptions({ title: label });
  }, [label]);

  const isSelected = (item: Element) =>
    !!selectedElementsState.find(
      (selectedElement) =>
        JSON.stringify(selectedElement.value) === JSON.stringify(item.value)
    );

  const itemPressed = (item: Element, isSelected: boolean) => {
    if (isSelected) {
      setSelectedElementsState(
        selectedElementsState.filter(
          (element) =>
            JSON.stringify(element.value) !== JSON.stringify(item.value)
        )
      );
      navigation.setParams({
        selectedElements: selectedElementsState.filter(
          (element) =>
            JSON.stringify(element.value) !== JSON.stringify(item.value)
        ),
      });
    } else {
      setSelectedElementsState([...selectedElementsState, item]);
      navigation.setParams({
        selectedElements: [...selectedElementsState, item],
      });
    }
  };

  const renderItem = (item: Element, index: number) => {
    return (
      <Pressable
        key={index}
        style={[
          styles.item,
          isSelected(item) && { backgroundColor: Color.greyLightColor },
        ]}
        onPress={() => itemPressed(item, isSelected(item))}
      >
        {isSelected(item) ? (
          <Icon name="checkbox-checked" size={24} color={Color.primaryColor} />
        ) : (
          <Icon
            name="checkbox-unchecked"
            size={24}
            color={Color.primaryColor}
          />
        )}
        <Text style={styles.label} greyDark medium>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    marginLeft: 4,
  },
});
