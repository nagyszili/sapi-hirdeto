import * as React from 'react';
import { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { SocialIcon } from 'react-native-elements';

import texts from '../../../assets/texts/texts.json';
import { useLoginWithEmailAndPassword } from '../../apollo/user/useLoginWithEmailAndPassword';
import { Button } from '../../components/Buttons/Button';
import { CheckBoxComponent } from '../../components/CheckboxComponent';
import { TextInput } from '../../components/TextInput/TextInput';
import { HoverText } from '../../components/themed/HoverText';
import { Text } from '../../components/themed/Text';
import { getErrorMessage } from '../../utils/errors';
import { ImageComponent } from '../../utils/images';
import * as Color from '../../utils/theme/colors';
import {
  isValidEmailPassword,
  emailErrorMessage,
  passwordErrorMessage,
} from '../../utils/validators';

interface Props {
  setTitle: (title: string) => void;
  switchLoginRegister: () => void;
}

export const LoginComponent: React.FC<Props> = ({
  setTitle,
  switchLoginRegister,
}) => {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();

  const [remember, setRemember] = useState(false);

  const { loginWithEmailAndPassword } = useLoginWithEmailAndPassword();

  React.useEffect(() => {
    setTitle(texts['signIn']);
  }, []);

  const login = async () => {
    const email = emailRef.current.getValue();
    const password = passwordRef.current.getValue();
    if (email && password && isValidEmailPassword(email, password)) {
      const { error } = await loginWithEmailAndPassword(email, password);
      if (error) {
        emailRef.current.showError(getErrorMessage(error));
      }
    } else {
      emailRef.current.showError();
      passwordRef.current.showError();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.labelInputGroup}>
          <Text style={styles.label} regular greyDark>
            {texts['emailAddress']}
          </Text>
          <TextInput ref={emailRef} errorMessage={emailErrorMessage} />
        </View>
        <View style={styles.labelInputGroup}>
          <View style={styles.passwordLabelContainer}>
            <Text style={styles.label} regular greyDark>
              {texts['password']}
            </Text>

            <HoverText style={styles.forgotPasswordLabel} onPress={() => {}}>
              {texts['forgotPassword']}
            </HoverText>
          </View>

          <TextInput
            ref={passwordRef}
            secureTextEntry
            errorMessage={passwordErrorMessage}
          />
        </View>
        <View style={styles.rememberContainer}>
          <CheckBoxComponent
            title={
              <Text style={styles.rememberLabel} regular greyDark>
                {texts['rememberMe']}
              </Text>
            }
            onSelect={() => setRemember((oldValue) => !oldValue)}
            selected={remember}
          />
        </View>

        <Button style={styles.button} onPress={login}>
          <Text style={styles.buttonText} semiBold white>
            {texts['login']}
          </Text>
        </Button>

        <View style={styles.line} />

        <Button
          style={styles.fbButton}
          hoverStyle={styles.fbHover}
          onPress={() => {}}
        >
          <SocialIcon
            iconSize={20}
            raised={false}
            style={styles.fbIcon}
            type="facebook"
          />
          <Text style={styles.buttonText} semiBold white>
            {texts['facebookLogin']}
          </Text>
        </Button>

        <Button
          style={styles.googleButton}
          hoverStyle={styles.googleHover}
          onPress={() => {}}
        >
          <View style={styles.googleIconContainer}>
            <ImageComponent name="google" style={styles.googleIcon} />
          </View>

          <Text style={styles.googleButtonText} semiBold white>
            {texts['googleLogin']}
          </Text>
        </Button>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText} regular greyDark>
          {texts['dontHaveAnAccount']}
        </Text>

        <HoverText style={styles.registerText} onPress={switchLoginRegister}>
          {texts['register']}
        </HoverText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  labelInputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  passwordLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgotPasswordLabel: {
    lineHeight: 18,
    fontSize: 13,
    color: Color.greyDarkColor,
  },
  rememberLabel: {
    fontSize: 15,
    marginLeft: 8,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginBottom: 7,
  },
  fbHover: {
    backgroundColor: '#0051a7',
  },
  fbButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#0B72E0',
    marginBottom: 12,
  },
  fbIcon: {
    position: 'absolute',
    left: 18,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
  },
  googleIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    left: 17,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Color.greyLightColor,
  },
  googleButtonText: {
    fontSize: 15,
    color: Color.greyDarkColor,
  },
  googleHover: {
    backgroundColor: Color.greyColor,
  },
  button: {
    width: '100%',
  },
  buttonText: {
    fontSize: 15,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Color.greyColor,
    marginVertical: 20,
  },
  textHover: {
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Color.greyColor,
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.greyLightColor,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  footerText: {
    fontSize: 15,
    marginRight: 5,
  },
  registerText: {
    fontSize: 15,
    color: Color.primaryColor,
  },
});
