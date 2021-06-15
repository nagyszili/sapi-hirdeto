import {
  ModalName,
  LoginModalParams,
  LocationModalParams,
  OperationsModalParams,
  DeleteModalParams,
} from '../../modals/types';
import { uiStateVar } from '../reactiveVariables';

const showModal = (name: ModalName, params = {}) => {
  uiStateVar({ ...uiStateVar(), activeModal: { name, params } });
};

export const showLoginModal = (params?: LoginModalParams) => {
  showModal('login', params);
};

export const showSortModal = () => {
  showModal('sort');
};

export const showOperationsModal = (params: OperationsModalParams) => {
  showModal('operations', params);
};

export const showListTypeModal = () => {
  showModal('listType');
};

export const showLocationModal = (params: LocationModalParams) => {
  showModal('location', params);
};

export const showDeleteModal = (params: DeleteModalParams) => {
  showModal('delete', params);
};

export const hideModal = () => {
  showModal('none');
};
