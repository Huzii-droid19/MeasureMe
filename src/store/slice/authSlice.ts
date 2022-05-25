import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../types';

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
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userMeta = action.payload.userMeta;
    },
  },
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;
export const selectUser = state => state.auth;
