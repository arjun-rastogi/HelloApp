import 'dotenv/config';

export default {
  "expo": {
    "name": "ReactNativeBoilerPlate",
    "slug": "ReactNativeBoilerPlate",
    "plugins": [
      [
        "react-native-fbsdk-next",
        {
          "appID": "508108111436122",
          "clientToken": "359ee8ffd0a98227ab9e8bd5b7da6f57",
          "displayName": "ReactNativeBoilerPlate",
        },
      ],
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ]
    ],
    "scheme" : "ReactNativeBoilerPlate",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "bundleIdentifier": "com.ReactNativeBoilerPlate",
      "supportsTablet": true
    },
    "android": {
      "package": "com.ReactNativeBoilerPlate",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra" : {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      "eas" : {
        "projectId": "c7568a51-3025-4e24-8e3b-10e7d2a2eace"
      }
    },
  }
}
