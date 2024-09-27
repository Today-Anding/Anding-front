import React from 'react';
import styled from 'styled-components/native';
import { BlackLogo } from '../../components/logo/Logo';
import GobackButton from '../../components/button/GobackButton';
import { Black10px, Black14px, Black20px } from '../../components/text/Text';
import Button from '../../components/button/Button';

function AuthSelectionScreen() {
  return (
    <Container>
      <BlackLogo style={logoStyle} />
      <GobackButton style={gobackButtonStyle} />
      <Black20px style={textStyle}>당신의</Black20px>
      <Black20px style={textStyle}>엔딩을 만들고 싶다면,</Black20px>
      <Black14px style={smallTextStyle}>기존의 앤딩 유저라면,</Black14px>
      <Button navigateTo={'Login'} text={'로그인'} style={buttonStyle} />
      <Black14px style={smallTextStyle}>
        새로운 앤딩 작가가 되고 싶다면,
      </Black14px>
      <Button navigateTo={'SignUp'} text={'회원가입'} style={buttonStyle} />
      <SnsBox>
        <Stroke />
        <Black10px>SNS 계정으로 로그인</Black10px>
        <Stroke />
      </SnsBox>
      <NaverButton>
        <NaverButtonText>N</NaverButtonText>
      </NaverButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  margin-top: 40px;
  padding: 50px;
  align-items: flex-start;
  justify-content: flex-start;
`;

const logoStyle = {
  marginBottom: 20,
};

const gobackButtonStyle = {
  marginBottom: 20,
  marginTop: 20,
};

const textStyle = {};

const smallTextStyle = {
  marginTop: 50,
};

const buttonStyle = {
  marginVertical: 10,
};

const SnsBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 80px;
  gap: 10px;
`;

const Stroke = styled.View`
  width: 67px;
  height: 1px;
  background-color: black;
`;

const NaverButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #2db400;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  align-self: center;
`;

const NaverButtonText = styled.Text`
  color: #fff;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`;

export default AuthSelectionScreen;
