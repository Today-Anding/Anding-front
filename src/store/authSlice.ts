import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoggedIn: boolean;
  account: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  account: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ account: string; token: string }>,
    ) => {
      state.isLoggedIn = true;
      state.account = action.payload.account;
      state.token = action.payload.token; // 토큰 저장
      AsyncStorage.setItem('isLoggedIn', 'true');
      AsyncStorage.setItem('account', action.payload.account);
      AsyncStorage.setItem('token', action.payload.token); // 토큰 저장
    },
    logout: state => {
      state.isLoggedIn = false;
      state.account = null;
      state.token = null; // 토큰 제거
      AsyncStorage.removeItem('isLoggedIn');
      AsyncStorage.removeItem('account');
      AsyncStorage.removeItem('token'); // 토큰 제거
    },
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.account = action.payload.account;
      state.token = action.payload.token; // 토큰 상태 설정
    },
  },
});

export const { login, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
