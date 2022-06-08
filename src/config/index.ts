import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_CLIENT_ID} from '@env';

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID, // this is web client id (Not Android)
  scopes: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
  ],
});

export const signInToGoogle = async () => {
  await GoogleSignin.hasPlayServices();
  await GoogleSignin.signIn();
  if (await GoogleSignin.isSignedIn()) {
    const {accessToken} = await GoogleSignin.getTokens();
    return accessToken;
  }
};
