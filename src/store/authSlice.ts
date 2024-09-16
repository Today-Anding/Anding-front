import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoggedIn: boolean;
  account: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  account: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ account: string }>) => {
      state.isLoggedIn = true;
      state.account = action.payload.account;
      AsyncStorage.setItem('isLoggedIn', 'true');
      AsyncStorage.setItem('account', action.payload.account);
    },
    logout: state => {
      state.isLoggedIn = false;
      state.account = null;
      AsyncStorage.removeItem('isLoggedIn');
      AsyncStorage.removeItem('account');
    },
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.account = action.payload.account;
    },
  },
});

export const { login, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
