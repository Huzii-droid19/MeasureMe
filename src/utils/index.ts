import {User} from 'types/index';
import Toast from 'react-native-toast-message';
import * as R from 'ramda';

const firstOrEmpty = R.ifElse(R.isEmpty, R.always([]), R.head);

export const first = (item: Array<User>) => {
  return firstOrEmpty(item);
};
export const getCurrentUserId = store => store.getState().auth.userMeta?.id;
export const addToast = (message: string, type: string) => {
  Toast.show({
    type: type,
    text1: type === 'success' ? 'Success' : 'Error',
    text2: message,
    position: 'top',
    visibilityTime: 3000,
  });
};
