import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, SocialIcon } from 'react-native-elements';
import Icon  from 'react-native-vector-icons/FontAwesome';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, FacebookAuthProvider } from 'firebase/auth';
import { ResponseType } from 'expo-auth-session';

interface Props {
  handleLogin: (email: string, password: string) => void;
}

const auth = getAuth();
WebBrowser.maybeCompleteAuthSession();

const SignupScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  const signUp = async() => {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }
    
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (err) {
      
      setValue({
        ...value,
        error: "Email Already in Use"
      })
    }
  }

 
  const [reqGoogle, resGoogle, googlelogin] = Google.useIdTokenAuthRequest(
    {
      clientId: "748027543804-5ncdlqv5pg4tjmj0qmb5jsn350ebc80q.apps.googleusercontent.com",
      iosClientId: "748027543804-oupgbfdc9tje9oot64th3lnp1nh564fr.apps.googleusercontent.com",
      androidClientId: "748027543804-aacvp9eqrio48ud17hsg4948p839srfi.apps.googleusercontent.com",
    },
  );


  const [reqFb, resFb, fblogin] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: '1884144825270373',
    androidClientId: "1884144825270373",
    iosClientId: "1884144825270373",
  });


  React.useEffect(() => {
    if (resGoogle?.type === 'success') {
      const { id_token } = resGoogle.params;
      const { accessToken } = resGoogle.params;
      
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token, accessToken);
      signInWithCredential(auth, credential)
      .then()
      .catch(err => console.log(err));
      }
  }, [resGoogle]);

  React.useEffect(() => {
    if (resFb?.type === 'success') {
      const { access_token } = resFb.params;
      const auth = getAuth();
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential).then().catch(err => console.log(err));
    }
  }, [resFb]);



  return (
    <View className='flex-1 justify-center items-center p-5'>
      <Text className='text-lg'>Signup screen!</Text>
      {!!value.error && <View className='text-white bg-red-500 p-3 mt-3'><Text>{value.error}</Text></View>}

      <Input
        placeholder='Email'
        className='ml-2 '
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
        keyboardType="email-address"
        leftIcon={<Icon
          name='envelope'
          size={16}
        />}
      />

      <Input
        placeholder='Password'
        className='ml-2 '
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        secureTextEntry={true}
        leftIcon={<Icon
          name='key'
          size={16}
        />}
      />

        <Button title="Signup" className='flex-1' onPress={signUp} />

        <SocialIcon
         onPress={() => {
          googlelogin();
        }}
         disabled={!reqGoogle}
         title='Sign in with google'
         button
         style={{padding: 20}} 
         type='google'
         />
 
        <SocialIcon
         onPress={() => {
          fblogin();
        }}
        disabled={!reqFb}
         title='Sign up with facebbok'
         button
         style={{padding: 20}} 
         type='facebook'
         />
    </View>
  );
};

export default SignupScreen;