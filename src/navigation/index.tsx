import React, {useEffect} from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
import * as Notifications from 'expo';
import * as Permissions from 'expo-permissions';

export default function RootNavigation() {
  const { user } = useAuthentication();

  useEffect(() => {
    getPushNotificationPermissions();
  });

  const getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
    console.log(finalStatus)

    // Get the token that uniquely identifies this device
  }

  return user ? <UserStack /> : <AuthStack />;
}