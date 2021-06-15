import { LocationQueryInput } from '../apollo/types/graphql-global-types';

export interface ModalCommonProps {
  setTitle: (title: string) => void;
  hideModal?: () => void;
}

export type LoginModalParams = { isRegister?: boolean };

export type LocationModalParams = {
  setLocation: (location?: LocationQueryInput | null) => void;
};

export type OperationsModalParams = {
  adId: string;
  userId: string;
  adIdentifier: string;
  adName: string;
};

export type DeleteModalParams = {
  adId: string;
  userId: string;
};
export type ModalName =
  | 'none'
  | 'login'
  | 'sort'
  | 'location'
  | 'listType'
  | 'operations'
  | 'delete';

export interface ModalType {
  name: ModalName;
  params: PossibleModalParams;
}

export type PossibleModalParams = {} | undefined;

export type ModalButtonTypes = 'primary' | 'primaryLight' | 'cancel';

export type AlertButtonProps = {
  text: string;
  onPress?: () => void;
  type: ModalButtonTypes;
};

export type AlertProps = {
  title: string;
  message: string;
  buttons?: AlertButtonProps[];
  cancelButton?: AlertButtonProps;
};
