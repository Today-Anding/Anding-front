import React, { useRef, useEffect, useState } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { RootStackParamList } from '../types/types';
import Splash from '../screens/splash/Splash';
import { DetailsScreen2, Main, StorySelectScreen } from '../screens';
import SignUpName from '../screens/signUp/SignUpName';
import SignUpEmail from '../screens/signUp/SignUpEmail';
import StoryCreationScreen from '../screens/writing/StoryCreationScreen';
import MyPage from '../screens/mypage/Mypage';

// RootStackParamList 타입으로 스택 네비게이터를 생성합니다.
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  // 네비게이션 컨테이너를 위한 참조를 생성합니다.
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);

  // 커스텀 탭 바의 표시 여부를 관리하기 위한 상태를 생성합니다.
  const [showTabBar, setShowTabBar] = useState<boolean>(false);

  // 탭 바를 보여줄 화면 이름의 배열을 정의합니다.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routeNamesToShowTabBar: (keyof RootStackParamList)[] = [
    'Main',
    'Details2',
    'SignUpName',
    'Mypage',
  ];

  useEffect(() => {
    // 상태 변화가 있을 때 호출되는 함수입니다.
    const onStateChange = () => {
      // 현재 라우트를 가져옵니다.
      const currentRoute = navigationRef.current?.getCurrentRoute();
      const currentRouteName = currentRoute?.name;

      // 현재 라우트 이름이 유효하고 탭 바를 보여줄 화면인지 확인합니다.
      const isValidRoute = currentRouteName
        ? routeNamesToShowTabBar.includes(
            currentRouteName as keyof RootStackParamList,
          )
        : false;

      // 상태를 업데이트하여 탭 바를 표시하거나 숨깁니다.
      setShowTabBar(isValidRoute);
    };

    // 네비게이션 상태 변화에 대한 리스너를 구독합니다.
    const unsubscribe = navigationRef.current?.addListener(
      'state',
      onStateChange,
    );

    // 컴포넌트가 언마운트될 때 구독을 정리합니다.
    return () => {
      unsubscribe?.();
    };
  }, [navigationRef, routeNamesToShowTabBar]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Details2" component={DetailsScreen2} />
        <Stack.Screen name="SignUpName" component={SignUpName} />
        <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
        <Stack.Screen name="StorySelect" component={StorySelectScreen} />
        <Stack.Screen name="StoryCreate" component={StoryCreationScreen} />
        <Stack.Screen name="Mypage" component={MyPage} />
      </Stack.Navigator>
      {showTabBar && (
        <TabBar>
          <CustomButton onPress={() => navigationRef.current?.navigate('Main')}>
            <ButtonText>메인</ButtonText>
          </CustomButton>
          <CustomButton onPress={() => navigationRef.current?.navigate('Main')}>
            <ButtonText>앤딩 읽기</ButtonText>
          </CustomButton>
          <CustomButton
            onPress={() => navigationRef.current?.navigate('SignUpName')}
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
`;

const CustomButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  background-color: #ffffff;
  margin: 0 5px;
  border-radius: 15px;
  border: #ff6565;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #ff6565;
  font-size: 12px;
`;

export default AppNavigator;
