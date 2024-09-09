import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Details2: undefined;
  SignUpName: undefined;
  SignUpEmail: undefined;
};

type ButtonProps = {
  navigateTo: keyof RootStackParamList;
  text: string;
};

export function Button({ navigateTo, text }: ButtonProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <StyledButton onPress={() => navigation.navigate(navigateTo)}>
      <ButtonText>{text}</ButtonText>
    </StyledButton>
  );
}

export function SmallButton({ navigateTo, text }: ButtonProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <StyledSmallButton onPress={() => navigation.navigate(navigateTo)}>
      <SmallButtonText>{text}</SmallButtonText>
    </StyledSmallButton>
  );
}

export default Button;

const StyledButton = styled.TouchableOpacity`
  width: 306px;
  height: 44px;
  padding: 10px;
  background: #ff5d5d;
  border-radius: 4px;
  margin-top: 30px;
`;

const StyledSmallButton = styled.TouchableOpacity`
  width: 62px;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 27px;
  border: 1px solid rgba(255, 78, 78, 0.3);
  background: #ffeaea;
  color: #000;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-family: 'Noto Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.4px;
`;

const SmallButtonText = styled.Text`
  color: #000;
`;
