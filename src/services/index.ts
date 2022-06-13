import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GOOGLE_CLIENT_ID} from '@env';
import {addToast} from 'utils/index';

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID, // this is web client id (Not Android)
  scopes: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
  ],
});

const signInToGoogle = async () => {
  await GoogleSignin.hasPlayServices();
  await GoogleSignin.signIn();
  if (await GoogleSignin.isSignedIn()) {
    const {accessToken} = await GoogleSignin.getTokens();
    return accessToken;
  }
};

export const createEvent = async (
  title: string,
  description: string,
  date: Date,
  addEvent: any,
  isMeetupAdded: boolean,
) => {
  try {
    const accessToken = await signInToGoogle();
    const {data, error} = await addEvent({
      task: {
        summary: title,
        description: description,
        start: {
          dateTime: new Date(),
        },
        end: {
          dateTime: date,
        },
        conferenceData: isMeetupAdded
          ? {
              createRequest: {
                conferenceSolutionKey: {
                  type: 'hangoutsMeet',
                },
                requestId: Math.random().toString(36).substring(2),
              },
            }
          : {},
      },
      accessToken,
    });
    if (error) {
      throw new Error(error);
    }
    return data as any;
  } catch (err: any) {
    console.log(err);
    addToast(err.message, 'error');
  }
};

export const createTask = async (
  title: string,
  description: string,
  date: Date,
  isCompleted: boolean,
  addTask: any,
  eventId = '',
  hangoutLink = '',
) => {
  try {
    await addTask({
      title,
      description,
      date,
      isCompleted,
      eventId,
      hangoutLink,
    });
  } catch (err: any) {
    addToast(err.message, 'error');
  }
};
