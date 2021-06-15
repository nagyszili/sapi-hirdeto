import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { updateListType } from '../../apollo/list-type/updateListType';
import { listTypeVar } from '../../apollo/reactiveVariables';
import { ListTypeEnum } from '../../apollo/types';
import { RadioRowComponent } from '../../components/Buttons/RadioRowComponent';
import * as Color from '../../utils/theme/colors';
import { ModalCommonProps } from '../types';

export const ListTypeModal: React.FC<ModalCommonProps> = ({
  setTitle,
  hideModal,
}) => {
  React.useLayoutEffect(() => {
    setTitle(texts['layout']);
  }, []);

  const listType = useReactiveVar(listTypeVar);

  const onPress = (value: ListTypeEnum) => {
    updateListType(value);
    hideModal && hideModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <RadioRowComponent
          onPress={() => onPress(ListTypeEnum.grid)}
          text={texts['grid']}
          isSelected={listType === ListTypeEnum.grid}
        />
        <RadioRowComponent
          onPress={() => onPress(ListTypeEnum.list)}
          text={texts['list']}
          isSelected={listType === ListTypeEnum.list}
        />
        <RadioRowComponent
          onPress={() => onPress(ListTypeEnum.gallery)}
          text={texts['gallery']}
          isSelected={listType === ListTypeEnum.gallery}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    backgroundColor: Color.greyLightColor,
  },
  content: {
    backgroundColor: Color.whiteColor,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
