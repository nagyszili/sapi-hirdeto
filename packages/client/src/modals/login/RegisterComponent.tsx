import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { useRegisterWithEmailAndPassword } from '../../apollo/user/useRegisterWithEmailAndPassword';
import { useSignUpWithFacebook } from '../../apollo/user/useSignUpWithFacebook';
import { useSignUpWithGoogle } from '../../apollo/user/useSignUpWithGoogle';
import { Button } from '../../components/Buttons/Button';
import { TextInput } from '../../components/TextInput/TextInput';
import { HoverText } from '../../components/themed/HoverText';
import { Text } from '../../components/themed/Text';
import { getErrorMessage } from '../../utils/errors';
import { Icon } from '../../utils/icons';
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
  hideModal?: () => void;
}

export const RegisterComponent: React.FC<Props> = ({
  setTitle,
  switchLoginRegister,
  hideModal,
}) => {
  const emailRef = React.useRef<any>();
  const passwordRef = React.useRef<any>();

  const { registerWithEmailAndPassword } = useRegisterWithEmailAndPassword();

  const { signUpWithGoogle } = useSignUpWithGoogle();

  const { signUpWithFacebook } = useSignUpWithFacebook();

  React.useLayoutEffect(() => {
    setTitle(texts['registration']);
  }, []);

  const register = async () => {
    const email = emailRef.current.getValue();
    const password = passwordRef.current.getValue();
    if (email && password && isValidEmailPassword(email, password)) {
      const { error } = await registerWithEmailAndPassword(email, password);
      if (error) {
        emailRef.current.showError(getErrorMessage(error));
      } else {
        hideModal && hideModal();
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
          <TextInput
            ref={emailRef}
            errorMessage={emailErrorMessage}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.labelInputGroup}>
          <View style={styles.passwordLabelContainer}>
            <Text style={styles.label} regular greyDark>
              {texts['password']}
            </Text>
          </View>

          <TextInput
            ref={passwordRef}
            secureTextEntry
            errorMessage={passwordErrorMessage}
            textContentType="password"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.terms} extraSmall greyMedium>
            {texts['acceptTerms']}
            <HoverText style={styles.termsLink}>
              {texts['termsAndConditions']}
            </HoverText>
          </Text>
        </View>

        <Button style={styles.button} onPress={register}>
          <Text style={styles.buttonText} semiBold white>
            {texts['registration']}
          </Text>
        </Button>

        <View style={styles.line} />

        <Button
          style={styles.fbButton}
          hoverStyle={styles.fbHover}
          onPress={() => signUpWithFacebook()}
        >
          <Icon
            name="facebook"
            style={styles.fbIcon}
            color={Color.whiteColor}
          />
          <Text style={styles.buttonText} semiBold white>
            {texts['facebookRegistration']}
          </Text>
        </Button>

        <Button
          style={styles.googleButton}
          hoverStyle={styles.googleHover}
          onPress={() => signUpWithGoogle()}
        >
          <View style={styles.googleIconContainer}>
            <ImageComponent name="google" style={styles.googleIcon} />
          </View>

          <Text style={styles.googleButtonText} semiBold white>
            {texts['googleRegistration']}
          </Text>
        </Button>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText} regular greyDark>
          {texts['doYouHaveAnAccount']}
        </Text>

        <HoverText style={styles.loginText} onPress={switchLoginRegister}>
          {texts['stepIn']}
        </HoverText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
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
    color: Color.primaryColor,
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
  termsContainer: {
    marginBottom: 24,
  },
  termsLink: {
    color: Color.greyDarkColor,
  },
  terms: {
    lineHeight: 19,
    textAlign: 'left',
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
  loginText: {
    fontSize: 15,
    color: Color.primaryColor,
  },
});
