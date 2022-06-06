import {User} from 'types/index';
import Toast from 'react-native-toast-message';
import {ifElse, isEmpty, always, head, pathOr} from 'ramda';

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
