import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider, useDispatch } from 'react-redux';
import AppNavigator from './src/appnavigator/AppNavigator';
import store from './src/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthState } from './src/store/authSlice';

const AppWithReduxAndNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const account = await AsyncStorage.getItem('account');

        dispatch(
          setAuthState({
            isLoggedIn: isLoggedIn === 'true',
            account: account || null,
          }),
        );
      } catch (error) {
        console.error('Failed to load auth state from AsyncStorage:', error);
      }
    };

    initializeAuth();
  }, [dispatch]);

  return <AppNavigator />;
};

const App = () => (
  <Provider store={store}>
    <AppWithReduxAndNavigation />
  </Provider>
);

AppRegistry.registerComponent(appName, () => App);
