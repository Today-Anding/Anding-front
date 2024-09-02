import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

type FormData = {
  name: string;
  email: string;
  gender: 'male' | 'female';
  nickname: string;
  account: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const {
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      gender: 'male',
      nickname: '',
      account: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [step, setStep] = useState(1);

  const handleNext = async () => {
    if (step === 1) {
      const result = await trigger(['name']);
      if (result) {
        setStep(2);
      }
    } else if (step === 2) {
      const result = await trigger(['email']);
      if (result) {
        setStep(3);
      }
    } else if (step === 3) {
      const result = await trigger(['gender']);
      if (result) {
        setStep(4);
      }
    } else if (step === 4) {
      const result = await trigger(['nickname']);
      if (result) {
        setStep(5);
      }
    } else if (step === 5) {
      const result = await trigger(['account']);
      if (result) {
        setStep(6);
      }
    } else if (step === 6) {
      const result = await trigger(['password', 'confirmPassword']);
      if (result && watch('password') === watch('confirmPassword')) {
        await onSubmit(watch());
      } else if (watch('password') !== watch('confirmPassword')) {
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // 실제 API 호출
      const response = await axios.post('/sign-api/sign-up?roles=ADMIN', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setStep(7);
    } catch (error) {
      // API 호출 실패 시에도 화면을 넘기도록 수정
      console.error('회원가입 에러', error);
      setStep(7);
    }
  };

  return (
    <SignupLayout>
      <SignupForm>
        {step === 1 && (
          <SignupTitle>
            <TitleText>이름 입력</TitleText>
            <SubtitleText>이름을 입력해주세요</SubtitleText>
            <Controller
              name="name"
              control={control}
              rules={{ required: '이름은 필수 입력 사항입니다.' }}
              render={({ field }) => (
                <InputWrapper>
                  <Label>이름</Label>
                  <Input
                    {...field}
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                  {errors.name && <Error>{errors.name.message}</Error>}
                </InputWrapper>
              )}
            />
            <NextButton onPress={handleNext}>
              <ButtonText>다음</ButtonText>
            </NextButton>
          </SignupTitle>
        )}
        {step === 2 && (
          <SignupTitle>
            <TitleText>이메일 입력</TitleText>
            <SubtitleText>이메일 주소를 입력해주세요</SubtitleText>
            <Controller
              name="email"
              control={control}
              rules={{ required: '이메일은 필수 입력 사항입니다.' }}
              render={({ field }) => (
                <InputWrapper>
                  <Label>이메일</Label>
                  <Input
                    {...field}
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                  {errors.email && <Error>{errors.email.message}</Error>}
                </InputWrapper>
              )}
            />
            <NextButton onPress={handleNext}>
              <ButtonText>다음</ButtonText>
            </NextButton>
          </SignupTitle>
        )}
        {step === 3 && (
          <SignupTitle>
            <TitleText>성별 선택</TitleText>
            <SubtitleText>성별을 선택해주세요</SubtitleText>
            <Controller
              name="gender"
              control={control}
              rules={{ required: '성별 선택은 필수입니다.' }}
              render={({ field }) => (
                <InputWrapper>
                  <Label>성별</Label>
                  <GenderSelect>
                    <GenderButton
                      onPress={() => field.onChange('male')}
                      selected={field.value === 'male'}
                    >
                      <GenderText selected={field.value === 'male'}>
                        남
                      </GenderText>
                    </GenderButton>
                    <GenderButton
                      onPress={() => field.onChange('female')}
                      selected={field.value === 'female'}
                    >
                      <GenderText selected={field.value === 'female'}>
                        여
                      </GenderText>
                    </GenderButton>
                  </GenderSelect>
                  {errors.gender && <Error>{errors.gender.message}</Error>}
                </InputWrapper>
              )}
            />
            <NextButton onPress={handleNext}>
              <ButtonText>다음</ButtonText>
            </NextButton>
          </SignupTitle>
        )}
        {step === 4 && (
          <SignupTitle>
            <TitleText>닉네임 입력</TitleText>
            <SubtitleText>닉네임을 입력해주세요</SubtitleText>
            <Controller
              name="nickname"
              control={control}
              rules={{ required: '닉네임은 필수 입력 사항입니다.' }}
              render={({ field }) => (
                <InputWrapper>
                  <Label>닉네임</Label>
                  <Input
                    {...field}
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                  {errors.nickname && <Error>{errors.nickname.message}</Error>}
                </InputWrapper>
              )}
            />
            <NextButton onPress={handleNext}>
              <ButtonText>다음</ButtonText>
            </NextButton>
          </SignupTitle>
        )}
        {step === 5 && (
          <SignupTitle>
            <TitleText>ID 입력</TitleText>
            <SubtitleText>ID를 입력해주세요</SubtitleText>
            <Controller
              name="account"
              control={control}
              rules={{ required: '아이디는 필수 입력 사항입니다.' }}
              render={({ field }) => (
                <InputWrapper>
                  <Label>아이디</Label>
                  <Input
                    {...field}
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                  {errors.account && <Error>{errors.account.message}</Error>}
                </InputWrapper>
              )}
            />
            <NextButton onPress={handleNext}>
              <ButtonText>다음</ButtonText>
            </NextButton>
          </SignupTitle>
        )}
        {step === 6 && (
          <SignupTitle>
            <TitleText>비밀번호 입력</TitleText>
            <SubtitleText>비밀번호를 입력하고 확인해주세요</SubtitleText>
            <Controller
              name="password"
              control={control}
              rules={{ required: '비밀번호는 필수 입력 사항입니다.' }}
              render={({ field }) => (
                <InputWrapper>
                  <Label>비밀번호</Label>
                  <Input
                    secureTextEntry
                    {...field}
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                  {errors.password && <Error>{errors.password.message}</Error>}
                </InputWrapper>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                validate: value =>
                  value === watch('password') ||
                  '비밀번호가 일치하지 않습니다.',
              }}
              render={({ field }) => (
                <InputWrapper>
                  <Label>비밀번호 확인</Label>
                  <Input
                    secureTextEntry
                    {...field}
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                  {errors.confirmPassword && (
                    <Error>{errors.confirmPassword.message}</Error>
                  )}
                </InputWrapper>
              )}
            />
            <NextButton onPress={handleNext}>
              <ButtonText>완료</ButtonText>
            </NextButton>
          </SignupTitle>
        )}
        {step === 7 && (
          <SignupTitle>
            <SignUpImgBox>
              {/* 여기에 축하 이미지를 렌더링 합니다 */}
            </SignUpImgBox>
            <TitleText>가입을 축하드립니다</TitleText>
            <SubtitleText>
              <HighlightText>{watch('name')}</HighlightText>님
            </SubtitleText>
            <LinktoLogin
              onPress={() => {
                /* 로그인으로 이동하는 로직 */
              }}
            >
              <ButtonText>로그인 하러가기</ButtonText>
            </LinktoLogin>
          </SignupTitle>
        )}
      </SignupForm>
    </SignupLayout>
  );
}

const SignupLayout = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 20px;
`;

const SignupForm = styled.View`
  width: 80%;
`;

const SignupTitle = styled.View`
  text-align: center;
  margin-bottom: 20px;
`;

const TitleText = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #ff5d5d;
`;

const SubtitleText = styled.Text`
  color: #949494;
  font-size: 14px;
  margin-top: 5px;
`;

const InputWrapper = styled.View`
  margin-bottom: 15px;
`;

const Label = styled.Text`
  margin-bottom: 5px;
`;

const Input = styled(TextInput)`
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 5px;
`;

const Error = styled.Text`
  color: red;
  font-size: 12px;
`;

const NextButton = styled(TouchableOpacity)`
  background-color: #ff5d5d;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

const GenderSelect = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const GenderButton = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#ff5d5d' : '#d9d9d9')};
  padding: 10px;
  border-radius: 8px;
  width: 40%;
  align-items: center;
`;

const GenderText = styled.Text<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-weight: 700;
`;

const SignUpImgBox = styled.View`
  margin-bottom: 20px;
`;

const HighlightText = styled.Text`
  color: #ff5d5d;
  font-weight: 700;
`;

const LinktoLogin = styled(TouchableOpacity)`
  background-color: #ff5d5d;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  margin-top: 20px;
`;
