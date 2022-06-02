import {User} from 'types/index';
import Toast from 'react-native-toast-message';

export const isEmpty = (item: Object) => Object.keys(item).length === 0;
export const first = (item: Array<User>) => {
  if (item.length > 0) {
    return item[0];
  } else {
    return {};
  }
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
