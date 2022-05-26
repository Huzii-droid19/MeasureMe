import {User} from 'types/index';

export const isEmpty = (item: Object) => Object.keys(item).length === 0;
export const first = (item: Array<User>) => item.find(e => e !== undefined);
export const getCurrentUserId = store => store.getState().auth.userMeta?.id;
