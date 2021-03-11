export interface ModalCommonProps {
  setTitle: (title: string) => void;
  hideModal?: () => void;
}

export type CommonModalParams = {
  next?: () => void;
};

export type LoginModalParams = { isRegister?: boolean } & CommonModalParams;

export type ModalName = 'none' | 'login';

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
