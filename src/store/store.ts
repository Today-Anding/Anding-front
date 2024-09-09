import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../services/rootReducer'; // 슬라이스들을 통합한 루트 리듀서

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
