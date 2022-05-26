import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from 'types/index';

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
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userMeta = action.payload.userMeta;
    },
  },
});

export const {setAuthUser} = authSlice.actions;
export default authSlice.reducer;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUserMeta = state => state.auth.userMeta;
