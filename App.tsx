import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import LandingScreen from './src/screens/LandingScreen';
import MainScreen from './src/screens/MainScreen';
import DetailsScreen2 from './src/screens/DetailScreen2';
import ComponentTest from './src/screens/ComponentTest';
import SignUpName from './src/screens/SignUp/SignUpName';
import SignUpEmail from './src/screens/SignUp/SignUpEmail';
import StorySelectScreen from './src/screens/StorySelectionScreen';
import StoryCreationScreen from './src/screens/StoryCreationScreen';

const Stack = createNativeStackNavigator();

function App() {
  const navigationRef = useRef(null);
  const [showTabBar, setShowTabBar] = useState(false);

  const routeNamesToShowTabBar = ['Main', 'Details2', 'SignUpName'];

  useEffect(() => {
    const onStateChange = () => {
      const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
      setShowTabBar(routeNamesToShowTabBar.includes(currentRouteName));
    };

    const unsubscribe = navigationRef.current?.addListener(
      'state',
      onStateChange,
    );

    return () => {
      unsubscribe?.();
    };
  }, [navigationRef, routeNamesToShowTabBar]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="ComponentTest" component={ComponentTest} />
        <Stack.Screen name="Details2" component={DetailsScreen2} />
        <Stack.Screen name="SignUpName" component={SignUpName} />
        <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
        <Stack.Screen name="StorySelect" component={StorySelectScreen} />
        <Stack.Screen name="StoryCreate" component={StoryCreationScreen} />
      </Stack.Navigator>
      {showTabBar && (
        <TabBar>
          <CustomButton
            onPress={() => navigationRef.current?.navigate('Details2')}>
            <ButtonText>Details</ButtonText>
          </CustomButton>
          <CustomButton onPress={() => navigationRef.current?.navigate('Main')}>
            <ButtonText>Home</ButtonText>
          </CustomButton>
          <CustomButton
            onPress={() => navigationRef.current?.navigate('SignUpName')}>
            <ButtonText>SignUp</ButtonText>
          </CustomButton>
        </TabBar>
      )}
    </NavigationContainer>
  );
}

const TabBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-vertical: 10px;
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const CustomButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  background-color: #ff7070;
  margin: 5px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 12px;
`;

export default App;
