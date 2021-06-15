import 'dotenv/config';

export default {
  expo: {
    name: 'client',
    slug: 'client',
    version: '1.0.0',
    scheme: 'client',
    privacy: 'hidden',
    orientation: 'portrait',
    primaryColor: '#256e43',
    icon: './assets/images/icon.png',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 30000,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.sapihirdeto',
      buildNumber: '1',
      supportsTablet: true,
    },
    android: {
      package: 'com.sapihirdeto',
      versionCode: 1,
      softwareKeyboardLayoutMode: 'pan',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#256e43',
      },
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
    facebookAppId: '1393460914380377',
    facebookDisplayName: 'Sapi-Hirdető',
    facebookScheme: 'fb1393460914380377',
    facebookAutoInitEnabled: true,
    extra: {
      backendUrl: process.env.BACKEND_URL,
      clientUrl: process.env.CLIENT_URL,
      sentryDSN:
        'https://78051a41e4114544b85c64acca7877f4@o828912.ingest.sentry.io/5811814',
      facebookAppId: '1393460914380377',
      googleConfig: {
        expoClientId:
          '709511246691-hknmp7aur3lfbq8g0oc4s2f3a9fnup97.apps.googleusercontent.com',
        androidClientId:
          '709511246691-lks27pn76uqjrekda6hli34l0qfs04d4.apps.googleusercontent.com',
        iosClientId:
          '709511246691-kkp490r29anlmuht6u9sv13clnm3b50n.apps.googleusercontent.com',
        webClientId:
          '709511246691-mim18fi0rgcu0idok2il7h3imbdn9cbq.apps.googleusercontent.com',
      },
    },
  },
};
