import * as React from 'react';
import { StyleSheet, View, Pressable, Platform } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { showDeleteModal } from '../../apollo/ui/modalMutations';
import { Text } from '../../components/themed/Text';
import { navigate } from '../../navigation/navigation';
import { shareAdOnFacebook, shareAd } from '../../utils';
import { Icon } from '../../utils/icons';
import * as Color from '../../utils/theme/colors';
import { ModalCommonProps, OperationsModalParams } from '../types';

type Props = ModalCommonProps & OperationsModalParams;

export const OperationsModal: React.FC<Props> = ({
  setTitle,
  hideModal,
  adId,
  userId,
  adIdentifier,
  adName,
}) => {
  React.useLayoutEffect(() => {
    setTitle(texts['operations']);
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.row}
        onPress={() => {
          navigate('UpdateAdScreen', {
            identifier: adIdentifier,
          });
          hideModal && hideModal();
        }}
      >
        <Text large semiBold>
          {texts['edit']}
        </Text>
        <Icon name="edit" size={24} />
      </Pressable>
      <Pressable
        style={styles.row}
        onPress={() =>
          Platform.OS === 'web'
            ? shareAdOnFacebook({ adIdentifier, adName })
            : shareAd({ adIdentifier, adName })
        }
      >
        <Text large semiBold>
          {texts['share']}
        </Text>
        <Icon name="share" size={24} />
      </Pressable>
      <Pressable
        style={styles.row}
        onPress={() => showDeleteModal({ adId, userId })}
      >
        <Text large semiBold errorColor>
          {texts['deleteAd']}
        </Text>
        <Icon name="delete" size={24} color={Color.errorColor} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.greyLightColor,
    paddingTop: 8,
  },
  row: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    backgroundColor: Color.whiteColor,
    borderBottomColor: 'rgba(228, 228, 228, 0.5)',
    borderBottomWidth: 1,
  },
});
