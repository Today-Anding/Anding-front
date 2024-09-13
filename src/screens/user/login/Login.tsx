import React from 'react';
import styled from 'styled-components/native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { BlackLogo } from '../../../components/logo/Logo';
import GobackButton from '../../../components/button/GobackButton';
import Config from 'react-native-config';

type FormData = {
  account: string;
  password: string;
};

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      account: '',
      password: '',
    },
  });

  const apiUrl = Config.API_URL;

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/sign-api/sign-in?account=${data.account}&password=${data.password}`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(response.data);
      Alert.alert('로그인 성공', '환영합니다!');
    } catch (error) {
      console.error('로그인 에러', error);
      Alert.alert('로그인 실패', '아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <Container>
      <LoginHead>
        <LogoWrapper>
          <BlackLogo />
        </LogoWrapper>
        <GoBackWrapper>
          <GobackButton />
        </GoBackWrapper>
        <WelcomeText>안녕하세요 :)</WelcomeText>
        <WelcomeText>여러분들의 창작 플랫폼,</WelcomeText>
        <WelcomeText>
          <HighlightText>앤딩</HighlightText>입니다.
        </WelcomeText>
      </LoginHead>
      <InputWrapper>
        <Controller
          name="account"
          control={control}
          rules={{ required: '아이디는 필수 입력 사항입니다.' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="아이디"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.account && <Error>{errors.account.message}</Error>}

        <Controller
          name="password"
          control={control}
          rules={{ required: '비밀번호는 필수 입력 사항입니다.' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="비밀번호"
              secureTextEntry
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Error>{errors.password.message}</Error>}

        <LoginButton onPress={handleSubmit(onSubmit)}>
          <ButtonText>로그인</ButtonText>
        </LoginButton>
      </InputWrapper>
    </Container>
  );
}

const LoginHead = styled.View`
  align-items: flex-start;
  width: 100%;
  padding: 20px 0;
  margin-left: 25px;
  margin-top: 20px;
`;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: white;
`;

const LogoWrapper = styled.View`
  margin-bottom: 20px;
`;

const GoBackWrapper = styled.View`
  margin-bottom: 20px;
`;

const InputWrapper = styled.View`
  width: 100%;
  align-items: center;
`;

const Input = styled(TextInput)`
  width: 336px;
  height: 44px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
`;

const Error = styled.Text`
  color: red;
  font-size: 12px;
  margin-bottom: 15px;
`;

const LoginButton = styled(TouchableOpacity)`
  width: 336px;
  height: 44px;
  background-color: #ff5d5d;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

const WelcomeText = styled.Text`
  font-size: 24px;
  color: #000;
  text-align: center;
  margin-bottom: 10px;
`;

const HighlightText = styled.Text`
  color: #ff5d5d;
  font-weight: 700;
`;

export default Login;
