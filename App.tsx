import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './src/screens/LandingScreen';
import MainScreen from './src/screens/MainScreen';
import DetailsScreen2 from './src/screens/DetailScreen2';
import ComponentTest from './src/screens/ComponentTest';
import SignUpName from './src/screens/SignUp/SignUpName';
import SignUpEmail from './src/screens/SignUp/SignUpEmail';
import StorySelectScreen from './src/screens/StorySelectionScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="ComponentTest" component={ComponentTest} />
        <Stack.Screen name="Details2" component={DetailsScreen2} />
        <Stack.Screen name="SignUpName" component={SignUpName} />
        <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
        <Stack.Screen name="StorySelect" component={StorySelectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
