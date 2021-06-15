import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  SafeAreaView,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  ActivityIndicator,
  View,
} from 'react-native';
import { CustomAnimation, Animation } from 'react-native-animatable';
import Modal from 'react-native-modal';

import { uiStateVar } from '../../apollo/reactiveVariables';
import { hideModal } from '../../apollo/ui/modalMutations';
import { ModalHeader } from '../../components/ModalHeader/ModalHeader';
import { DeleteModal } from '../../modals/delete/DeleteModal';
import { ListTypeModal } from '../../modals/list-type/ListTypeModal';
import { LocationModal } from '../../modals/location/LocationModal';
import { LoginModal } from '../../modals/login/LoginModal';
import { OperationsModal } from '../../modals/operations/OperationsModal';
import { SortModal } from '../../modals/sort/SortModal';
import {
  ModalCommonProps,
  LoginModalParams,
  ModalName,
  LocationModalParams,
  OperationsModalParams,
  DeleteModalParams,
} from '../../modals/types';

type ModalsMap = (props: ModalCommonProps) => ModalsObject;

type ModalsObject = {
  [name in ModalName]: (
    params: any
  ) => React.ReactElement<ModalCommonProps> | null;
};

interface Props {
  style: StyleProp<ViewStyle>;
  animationIn?: Animation | CustomAnimation;
  animationOut?: Animation | CustomAnimation;
  safeContainerStyle: StyleProp<ViewStyle>;
}

const modals: ModalsMap = (props: ModalCommonProps) => ({
  none: () => null,
  login: (params?: LoginModalParams) => <LoginModal {...props} {...params} />,
  sort: () => <SortModal {...props} />,
  location: (params: LocationModalParams) => (
    <LocationModal {...props} {...params} />
  ),
  listType: () => <ListTypeModal {...props} />,
  operations: (params: OperationsModalParams) => (
    <OperationsModal {...props} {...params} />
  ),
  delete: (params: DeleteModalParams) => <DeleteModal {...props} {...params} />,
});

export const UIStateComponent: React.FC<Props> = ({
  style,
  animationIn,
  animationOut,
  safeContainerStyle,
}) => {
  const uiStateData = useReactiveVar(uiStateVar);

  const [title, setTitle] = useState('');

  const { activeModal, isLoading, activeAlert } = uiStateData;

  const existsActiveModal = activeModal.name !== 'none';

  const _hideModal = () => {
    if (!isLoading) {
      hideModal();
    }
  };

  const behavior = (): 'padding' | 'height' | 'position' | undefined => {
    if (Platform.OS === 'ios') return 'padding';
    return undefined;
  };

  const getDeviceWidth = () =>
    Platform.OS === 'web'
      ? Dimensions.get('window').width
      : Dimensions.get('screen').width;

  const getDeviceHeight = () =>
    Platform.OS === 'web'
      ? Dimensions.get('window').height
      : Dimensions.get('screen').height;

  const _swipeDirection = () => (isLoading || activeAlert ? undefined : 'down');

  return (
    <Modal
      coverScreen={false}
      style={style}
      isVisible={existsActiveModal || isLoading || !!activeAlert}
      onSwipeComplete={_hideModal}
      swipeDirection={_swipeDirection()}
      onBackdropPress={_hideModal}
      animationIn={animationIn}
      animationOut={animationOut}
      deviceHeight={getDeviceHeight()}
      deviceWidth={getDeviceWidth()}
      supportedOrientations={['portrait']}
      backdropTransitionOutTiming={0}
      propagateSwipe
    >
      {(isLoading || activeAlert) && (
        <SafeAreaView style={styles.loading}>
          {activeAlert ? (
            () => alert(activeAlert.message)
          ) : (
            <ActivityIndicator animating={isLoading} size="large" />
          )}
        </SafeAreaView>
      )}
      {existsActiveModal && (
        <KeyboardAvoidingView
          enabled
          behavior={behavior()}
          style={safeContainerStyle}
        >
          <SafeAreaView>
            {(isLoading || activeAlert) && (
              <View style={styles.disabledActiveModal} />
            )}
            <ModalHeader title={title} close={_hideModal} />
            {modals({ setTitle, hideModal })[activeModal.name](
              activeModal.params
            )}
          </SafeAreaView>
        </KeyboardAvoidingView>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 100,
  },
  disabledActiveModal: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'black',
    opacity: 0.5,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
});
