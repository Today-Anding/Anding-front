import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const SideNav: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const navigation = useNavigation();

  if (!visible) return null;

  return (
    <SidebarContainer>
      <CloseButton onPress={onClose}>X</CloseButton>
      <Button onPress={() => navigation.navigate('Details1')}>
        <ButtonText>메인으로 돌아가기</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate('Details2')}>
        <ButtonText>마이페이지</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate('Details3')}>
        <ButtonText>랭킹페이지</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate('Details4')}>
        <ButtonText>설정</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate('AuthSelectionScreen')}>
        <ButtonText>로그인/회원가입</ButtonText>
      </Button>
    </SidebarContainer>
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
  z-index: 1000;
`;

const CloseButton = styled.Text`
  font-size: 24px;
  color: #fff;
  text-align: right;
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  margin-bottom: 15px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Noto Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`;
