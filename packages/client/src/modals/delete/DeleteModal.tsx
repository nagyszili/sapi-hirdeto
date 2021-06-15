import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { Button } from '../../components/Buttons/Button';
import { RadioRowComponent } from '../../components/Buttons/RadioRowComponent';
import { Text } from '../../components/themed/Text';
import { useComponentSize } from '../../hooks/useComponentSize';
import { useSetAdStatusById } from '../../hooks/useSetAdStatusById';
import { navigationRef, navigate } from '../../navigation/navigation';
import { STATUS } from '../../utils/constants';
import * as Color from '../../utils/theme/colors';
import { ModalCommonProps, DeleteModalParams } from '../types';

type Props = ModalCommonProps & DeleteModalParams;

enum DeletedReason {
  Sold = 'sold',
  SoldElsewhere = 'sold elsewhere',
  Other = 'other',
}

export const DeleteModal: React.FC<Props> = ({
  hideModal,
  setTitle,
  adId,
  userId,
}) => {
  React.useLayoutEffect(() => {
    setTitle(texts['deleteAd']);
  }, []);

  const { setAdStatus } = useSetAdStatusById();
  const [deleteReason, setDeleteReason] = useState('');
  const size = useComponentSize();

  const _delete = () => {
    if (deleteReason !== '') {
      setAdStatus({
        userId,
        adId,
        status: STATUS.DELETED,
        reasonOfDelete: deleteReason,
      });
      if (
        // @ts-ignore
        navigationRef?.current?.getCurrentRoute().name === 'AdDetailsScreen'
      ) {
        if (size === 'small') {
          navigate('Home');
        } else {
          navigate('HomeScreen');
        }
      }
      hideModal && hideModal();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text large semiBold style={styles.text}>
            {texts.whyDelete}
          </Text>

          <RadioRowComponent
            onPress={() => setDeleteReason(DeletedReason.Sold)}
            text={texts.sold}
            isSelected={deleteReason === DeletedReason.Sold}
          />
          <RadioRowComponent
            onPress={() => setDeleteReason(DeletedReason.SoldElsewhere)}
            text={texts.soldElsewhere}
            isSelected={deleteReason === DeletedReason.SoldElsewhere}
          />
          <RadioRowComponent
            onPress={() => setDeleteReason(DeletedReason.Other)}
            text={texts.other}
            isSelected={deleteReason === DeletedReason.Other}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text={texts.deleteAd}
          onPress={_delete}
          style={[
            styles.buttonLeft,
            deleteReason === '' && { backgroundColor: Color.greyColor },
          ]}
          textStyle={[
            styles.buttonText,
            deleteReason !== '' && { color: Color.whiteColor },
          ]}
          disableHover
        />
        <Button
          text={texts.cancel}
          onPress={() => hideModal && hideModal()}
          style={styles.buttonRight}
          textStyle={styles.buttonText}
          disableHover
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.greyLightColor,
    paddingTop: 8,
  },
  content: {
    backgroundColor: Color.whiteColor,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 20,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  buttonLeft: {
    flex: 1,
    marginRight: 8,
  },
  buttonRight: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: Color.greyColor,
  },
  buttonText: {
    color: Color.blackColor,
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    marginBottom: 16,
  },
});
