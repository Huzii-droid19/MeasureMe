import Toast from 'react-native-toast-message';
import {ifElse, isEmpty, always, head, pathOr} from 'ramda';
import {Linking} from 'react-native';

import {User} from 'types';

const firstOrEmpty = ifElse(isEmpty, always([]), head);

export const first = (item: Array<User>) => {
  return firstOrEmpty(item);
};
export const getCurrentUserId = store =>
  pathOr(null, ['auth', 'userMeta', 'id'], store.getState());
export const addToast = (message: string, type: string) => {
  Toast.show({
    type: type,
    text1: type === 'success' ? 'Success' : 'Error',
    text2: message,
    position: 'top',
    visibilityTime: 3000,
  });
};

export const navigateToURL = (url: string) => {
  try {
    Linking.openURL(url);
  } catch (error: any) {
    addToast(error.message, 'error');
  }
};
