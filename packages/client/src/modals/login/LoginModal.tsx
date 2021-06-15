import * as React from 'react';
import { useState } from 'react';

import { ModalCommonProps, LoginModalParams } from '../types';
import { LoginComponent } from './LoginComponent';
import { RegisterComponent } from './RegisterComponent';

type Props = ModalCommonProps & LoginModalParams;

export const LoginModal: React.FC<Props> = ({
  isRegister,
  setTitle,
  hideModal,
}) => {
  const [isLogin, setIsLogin] = useState(!isRegister);

  const switchLoginRegister = () => {
    setIsLogin((oldValue) => !oldValue);
  };

  return isLogin ? (
    <LoginComponent
      hideModal={hideModal}
      setTitle={setTitle}
      switchLoginRegister={switchLoginRegister}
    />
  ) : (
    <RegisterComponent
      hideModal={hideModal}
      setTitle={setTitle}
      switchLoginRegister={switchLoginRegister}
    />
  );
};
