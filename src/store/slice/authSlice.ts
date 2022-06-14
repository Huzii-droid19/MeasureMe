import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {pathOr} from 'ramda';

import {User} from 'types';

type AuthState = {
  isLoggedIn: boolean;
  userMeta: User | null;
};

const initialState = {
  isLoggedIn: false,
  userMeta: null,
} as AuthState;

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = pathOr(false, ['payload', 'isLoggedIn'], action);
      state.userMeta = pathOr(null, ['payload', 'userMeta'], action);
    },
  },
});

export const {setAuthUser} = authSlice.actions;
export default authSlice.reducer;
export const selectIsLoggedIn = state =>
  pathOr(false, ['auth', 'isLoggedIn'], state);
export const selectUserMeta = state =>
  pathOr(null, ['auth', 'userMeta'], state);
