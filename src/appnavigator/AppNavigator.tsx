import React, { useRef, useEffect, useState } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { RootStackParamList } from '../types/types';
import Splash from '../screens/splash/Splash';
import {
  StoryReadCategory,
  Main,
  StorySelectScreen,
  Ranking,
} from '../screens';
import StoryCreationScreen from '../screens/writing/StoryCreationScreen';
import MyPage from '../screens/mypage/Mypage';
import AuthSelectionScreen from '../screens/user/AuthSelectionScreen';
import Login from '../screens/user/login/Login';
import SignUp from '../screens/user/signUp/SignUp';
import StoryReadDetail from '../screens/reading/StoryReadDetail';
import StoryRoomSelectScreen from '../screens/writing/StoryRoomSelectScreen';
import StoryTurnScreen from '../screens/writing/StoryTurnScreen';
import PreviousStoryScreen from '../screens/writing/PreviousStoryScreen';
import StoryInfoReview from '../screens/reading/StoryInfoReview';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout, setAuthState } from '../store/authSlice';
import SideNav from '../components/sidenav/SideNav';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);

  const [showTabBar, setShowTabBar] = useState<boolean>(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isLoggedInValue = await AsyncStorage.getItem('isLoggedIn');
        const account = await AsyncStorage.getItem('account');

        dispatch(
          setAuthState({
            isLoggedIn: isLoggedInValue === 'true',
            account: account || null,
            token: null,
          }),
        );
      } catch (error) {
        console.error('Failed to restore auth state:', error);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  useEffect(() => {
    const onStateChange = () => {
      const currentRoute = navigationRef.current?.getCurrentRoute();
      const currentRouteName = currentRoute?.name;

      const hideTabBar = currentRouteName
        ? routeNamesToHideTabBar.includes(
            currentRouteName as keyof RootStackParamList,
          )
        : false;
      const isValidRoute = currentRouteName
        ? routeNamesToShowTabBar.includes(
            currentRouteName as keyof RootStackParamList,
          )
        : false;

      setShowTabBar(!hideTabBar && isValidRoute);
    };

    const unsubscribe = navigationRef.current?.addListener(
      'state',
      onStateChange,
    );
    return () => {
      unsubscribe?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigationRef]);

  const routeNamesToShowTabBar: (keyof RootStackParamList)[] = [
    'Main',
    'StoryReadCategory',
    'SignUpName',
    'Mypage',
    'StoryWriteCreate',
    'StoryWriteSelect',
    'StoryRoomSelectScreen',
    'Ranking',
    'StoryTurnScreen',
    'PreviousStoryScreen',
    'StoryInfoReview',
    'StoryReadDetail',
  ];

  const routeNamesToHideTabBar: (keyof RootStackParamList)[] = [
    'Splash',
    'Login',
    'SignUp',
    'AuthSelectionScreen',
  ];

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="AuthSelectionScreen"
          component={AuthSelectionScreen}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="StoryReadCategory" component={StoryReadCategory} />
        <Stack.Screen name="StoryReadDetail" component={StoryReadDetail} />
        <Stack.Screen name="StoryWriteSelect" component={StorySelectScreen} />
        <Stack.Screen
          name="StoryRoomSelectScreen"
          component={StoryRoomSelectScreen}
        />
        <Stack.Screen name="StoryWriteCreate" component={StoryCreationScreen} />
        <Stack.Screen name="Mypage" component={MyPage} />
        <Stack.Screen name="Ranking" component={Ranking} />
        <Stack.Screen name="StoryTurnScreen" component={StoryTurnScreen} />
        <Stack.Screen
          name="PreviousStoryScreen"
          component={PreviousStoryScreen}
        />
        <Stack.Screen name="StoryInfoReview" component={StoryInfoReview} />
      </Stack.Navigator>
      {showTabBar && (
        <TabBar>
          <CustomButton onPress={() => navigationRef.current?.navigate('Main')}>
            <ButtonText>메인</ButtonText>
          </CustomButton>
          <CustomButton
            onPress={() => navigationRef.current?.navigate('StoryReadCategory')}
          >
            <ButtonText>앤딩 읽기</ButtonText>
          </CustomButton>
          <CustomButton
            onPress={() => navigationRef.current?.navigate('Ranking')}
          >
            <ButtonText>랭킹</ButtonText>
          </CustomButton>
          <CustomButton
            onPress={() => navigationRef.current?.navigate('Mypage')}
          >
            <ButtonText>마이페이지</ButtonText>
          </CustomButton>
        </TabBar>
      )}
      <SideNav
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          dispatch(logout());
          setSidebarVisible(false);
        }}
      />
    </NavigationContainer>
  );
}

const TabBar = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0;
  border: 1px solid rgba(255, 137, 137, 0.25);
`;

const CustomButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  background-color: #ffffff;
  margin-left: -10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #ff6565;
  font-size: 12px;
`;

export default AppNavigator;
