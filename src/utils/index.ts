import {User} from 'types/index';

export const isEmpty = (item: Object) => Object.keys(item).length === 0;
export const first = (item: Array<User>) => {
  if (item.length > 0) {
    return item[0];
  } else {
    return {};
  }
};
export const getCurrentUserId = store => store.getState().auth.userMeta?.id;
