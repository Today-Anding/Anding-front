import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { SideWhiteLogoText } from '../logo/Logo';
import { Image, TouchableWithoutFeedback } from 'react-native';

interface SideNavProps {
  visible: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const SideNav: React.FC<SideNavProps> = ({
  visible,
  onClose,
  isLoggedIn,
  onLogout,
}) => {
  const navigation = useNavigation();

  if (!visible) return null;

  const handleLogout = () => {
    onLogout();
    navigation.navigate('AuthSelectionScreen');
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <Backdrop />
      </TouchableWithoutFeedback>
      <SidebarContainer>
        <CloseButton onPress={onClose}>✕</CloseButton>
        <SideWhiteLogoText>today Anding</SideWhiteLogoText>
        <Button onPress={() => navigation.navigate('Main')}>
          <Image source={require('../../assets/images/sideNav1.png')} />
          <ButtonText>메인으로 돌아가기</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate('Mypage')}>
          <Image source={require('../../assets/images/sideNav2.png')} />
          <ButtonText>마이페이지</ButtonText>
        </Button>
        <Button onPress={() => navigation.navigate('Ranking')}>
          <Image source={require('../../assets/images/sideNav3.png')} />
          <ButtonText>랭킹페이지</ButtonText>
        </Button>
        {isLoggedIn ? (
          <Button onPress={handleLogout}>
            <BottomText>로그아웃</BottomText>
          </Button>
        ) : (
          <Button onPress={() => navigation.navigate('AuthSelectionScreen')}>
            <BottomText>로그인/회원가입</BottomText>
          </Button>
        )}
      </SidebarContainer>
    </>
  );
};

export default SideNav;

const SidebarContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  width: 195px;
  height: 100%;
  background-color: #ff7d7d;
  border-right-width: 1px;
  border-right-color: #ccc;
  padding: 20px;
  z-index: 1001;
  align-items: center;
`;

const Backdrop = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const CloseButton = styled.Text`
  font-size: 24px;
  color: #fff;
  text-align: right;
  margin-bottom: 20px;
  margin-left: 100px;
`;

const Button = styled.TouchableOpacity`
  margin-top: 40px;
  align-items: center;
  padding: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Noto Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  margin-top: 10px;
`;

const BottomText = styled.Text`
  color: #fff;
  text-align: center;
  font-family: 'Noto Sans';
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  margin-top: 200px;
`;
