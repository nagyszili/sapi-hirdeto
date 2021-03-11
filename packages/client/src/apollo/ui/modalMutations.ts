import { ModalName, LoginModalParams } from '../../modals/types';
import { uiStateVar } from '../reactiveVariables';

const showModal = (name: ModalName, params = {}) =>
  uiStateVar({ ...uiStateVar(), activeModal: { name, params } });

export const showLoginModal = (params?: LoginModalParams) => {
  showModal('login', params);
};

export const hideModal = () => {
  showModal('none');
};
