import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useForm, Controller } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { BlackLogo } from '../../../components/logo/Logo';
import GobackButton from '../../../components/button/GobackButton';
import { Black20px } from '../../../components/text/Text';
import { Inputtext } from '../../../components/input/Input';

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
          <View>
            <SignupHead>
              <BlackLogo />
              <GobackButton />
              <Black20px>입력한 정보가 맞다면</Black20px>
              <Black20px>아래 확인 버튼을 눌러주세요.</Black20px>
            </SignupHead>
            <SignupTitle>
              <Controller
                name="name"
                control={control}
                rules={{ required: '이름은 필수 입력 사항입니다.' }}
                render={({ field }) => (
                  <Inputtext
                    label="이름"
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {errors.name && <Error>{errors.name.message}</Error>}
              <NextButton onPress={handleNext}>
                <ButtonText>다음</ButtonText>
              </NextButton>
            </SignupTitle>
          </View>
        )}
        {step === 2 && (
          <View>
            <SignupHead>
              <BlackLogo />
              <GobackButton />
              <Black20px>입력한 정보가 맞다면</Black20px>
              <Black20px>아래 확인 버튼을 눌러주세요.</Black20px>
            </SignupHead>
            <SignupTitle>
              <Controller
                name="email"
                control={control}
                rules={{ required: '이메일은 필수 입력 사항입니다.' }}
                render={({ field }) => (
                  <Inputtext
                    label="이메일"
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {errors.email && <Error>{errors.email.message}</Error>}
              <NextButton onPress={handleNext}>
                <ButtonText>다음</ButtonText>
              </NextButton>
            </SignupTitle>
          </View>
        )}
        {step === 3 && (
          <View>
            <SignupHead>
              <BlackLogo />
              <GobackButton />
              <Black20px>입력한 정보가 맞다면</Black20px>
              <Black20px>아래 확인 버튼을 눌러주세요.</Black20px>
            </SignupHead>
            <SignupTitle>
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
          </View>
        )}
        {step === 4 && (
          <View>
            <SignupHead>
              <BlackLogo />
              <GobackButton />
              <Black20px>입력한 정보가 맞다면</Black20px>
              <Black20px>아래 확인 버튼을 눌러주세요.</Black20px>
            </SignupHead>
            <SignupTitle>
              <Controller
                name="nickname"
                control={control}
                rules={{ required: '닉네임은 필수 입력 사항입니다.' }}
                render={({ field }) => (
                  <Inputtext
                    label="닉네임"
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {errors.nickname && <Error>{errors.nickname.message}</Error>}
              <NextButton onPress={handleNext}>
                <ButtonText>확인</ButtonText>
              </NextButton>
            </SignupTitle>
          </View>
        )}
        {step === 5 && (
          <View>
            <SignupHead>
              <BlackLogo />
              <GobackButton />
              <Black20px>입력한 정보가 맞다면</Black20px>
              <Black20px>아래 확인 버튼을 눌러주세요.</Black20px>
            </SignupHead>
            <SignupTitle>
              <Controller
                name="account"
                control={control}
                rules={{ required: '아이디는 필수 입력 사항입니다.' }}
                render={({ field }) => (
                  <Inputtext
                    label="아이디"
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {errors.account && <Error>{errors.account.message}</Error>}

              <NextButton onPress={handleNext}>
                <ButtonText>다음</ButtonText>
              </NextButton>
            </SignupTitle>
          </View>
        )}
        {step === 6 && (
          <View>
            <SignupHead>
              <BlackLogo />
              <GobackButton />
              <Black20px>입력한 정보가 맞다면</Black20px>
              <Black20px>아래 확인 버튼을 눌러주세요.</Black20px>
            </SignupHead>
            <SignupTitle>
              <Controller
                name="password"
                control={control}
                rules={{ required: '비밀번호는 필수 입력 사항입니다.' }}
                render={({ field }) => (
                  <Inputtext
                    label="비밀번호"
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {errors.password && <Error>{errors.password.message}</Error>}
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  validate: value =>
                    value === watch('password') ||
                    '비밀번호가 일치하지 않습니다.',
                }}
                render={({ field }) => (
                  <Inputtext
                    label="비밀번호 확인"
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {errors.confirmPassword && (
                <Error>{errors.confirmPassword.message}</Error>
              )}
              <NextButton onPress={handleNext}>
                <ButtonText>완료</ButtonText>
              </NextButton>
            </SignupTitle>
          </View>
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

const SignupHead = styled.View`
  align-items: flex-start;
  width: 100%;
  padding: 20px 0;
  margin-left: 25px;
  margin-top: 20px;
`;

const SignupLayout = styled.View`
  flex: 1;
  padding-top: 20px;
  background-color: white;
`;

const SignupForm = styled.View`
  width: 100%;
`;

const SignupTitle = styled.View`
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 70px;
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

const Error = styled.Text`
  color: red;
  font-size: 12px;
`;

const NextButton = styled(TouchableOpacity)`
  width: 306px;
  height: 44px;
  flex-shrink: 0;
  background-color: #ff5d5d;
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  margin-top: 50px;
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
