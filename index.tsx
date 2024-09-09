/* eslint-disable react/react-in-jsx-scope */
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/appnavigator/AppNavigator';

const AppWithReduxAndNavigation = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithReduxAndNavigation);
