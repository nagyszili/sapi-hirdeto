import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { listTypeVar } from '../../../apollo/reactiveVariables';
import { ListTypeEnum } from '../../../apollo/types';
import { LocationQueryInput } from '../../../apollo/types/graphql-global-types';
import {
  showSortModal,
  showLocationModal,
  showListTypeModal,
} from '../../../apollo/ui/modalMutations';
import { Text } from '../../../components/themed/Text';
import { Icon } from '../../../utils/icons';
import * as Color from '../../../utils/theme/colors';

interface Props {
  setLocation: (location?: LocationQueryInput | null) => void;
  location?: LocationQueryInput | null;
  numberOfAds?: number;
}

export const AdsListHeaderComponent: React.FC<Props> = ({
  setLocation,
  location,
  numberOfAds,
}) => {
  const listType = useReactiveVar(listTypeVar);

  return (
    <View>
      <View style={styles.row}>
        <Text extraSmall greyDark>
          {texts['moreThen']} {numberOfAds} {texts['result']}
        </Text>

        <Pressable
          onPress={() => showListTypeModal()}
          style={styles.listTypeButton}
        >
          {listType === ListTypeEnum.grid ? (
            <Icon name="grid" size={16} />
          ) : listType === ListTypeEnum.list ? (
            <Icon name="list" size={16} />
          ) : (
            <Icon name="gallery" size={16} />
          )}
        </Pressable>
      </View>
      <View style={styles.sortLocContainer}>
        <Pressable onPress={() => showSortModal()} style={styles.sort}>
          <Icon name="sort" size={22} />
          <Text style={styles.buttonLabel}>{texts['sort']}</Text>
        </Pressable>

        <Pressable
          onPress={() => showLocationModal({ setLocation })}
          style={styles.sort}
        >
          <View style={styles.iconLabel}>
            <Icon name="location" size={22} />
            <Text style={styles.buttonLabel} numberOfLines={1}>
              {location ? location.name : texts['allRomania']}
            </Text>
          </View>

          {location && (
            <Pressable onPress={() => setLocation(undefined)}>
              <Icon name="close" color="#424242" size={24} />
            </Pressable>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingRight: 8,
    marginVertical: 4,
  },
  sortLocContainer: {
    backgroundColor: Color.whiteColor,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    width: '100%',
  },
  sort: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    backgroundColor: Color.whiteColor,
    marginHorizontal: 4,
    alignItems: 'center',
    borderRadius: 6,
    borderColor: Color.greyColor,
    borderWidth: 1,
  },
  buttonLabel: {
    fontSize: 15,
    marginLeft: 5,
    flex: 1,
  },
  iconLabel: {
    flexDirection: 'row',
    flex: 1,
  },
  listTypeButton: {
    padding: 10,
  },
});
