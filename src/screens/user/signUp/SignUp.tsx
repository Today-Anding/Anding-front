import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useForm, Controller } from 'react-hook-form';
import { Image, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { BlackLogo } from '../../../components/logo/Logo';
import GobackButton from '../../../components/button/GobackButton';
import { Black16px, Black20px } from '../../../components/text/Text';
import { Inputtext } from '../../../components/input/Input';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';

type FormData = {
  name: string;
  phone: string;
  gender: 'man' | 'woman';
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
      phone: '',
      gender: 'man',
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
      const result = await trigger(['phone']);
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
        // 비밀번호 불일치 처리
      }
    }
  };

  const apiUrl = Config.API_URL;

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/sign-api/sign-up?roles=admin`,
        {
          account: data.account,
          gender: data.gender,
          name: data.name,
          nickname: data.nickname,
          password: data.password,
          phone: data.phone,
        },
        {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
      setStep(7);
    } catch (error) {
      console.error('회원가입 에러', error);
      setStep(7);
    }
  };

  const navigation = useNavigation();

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
                name="phone"
                control={control}
                rules={{ required: '번호는 필수 입력 사항입니다.' }}
                render={({ field }) => (
                  <Inputtext
                    label="번호"
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                )}
              />
              {errors.phone && <Error>{errors.phone.message}</Error>}
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
                        onPress={() => field.onChange('man')}
                        selected={field.value === 'man'}
                      >
                        <GenderText selected={field.value === 'man'}>
                          남
                        </GenderText>
                      </GenderButton>
                      <GenderButton
                        onPress={() => field.onChange('woman')}
                        selected={field.value === 'woman'}
                      >
                        <GenderText selected={field.value === 'woman'}>
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
                    secureTextEntry
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
                    secureTextEntry
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
          <Step7Box>
            <BlackLogo />
            <SubtitleText>{watch('name')} 회원님,</SubtitleText>
            <TitleText>만나서 반갑습니다!</TitleText>
            <SignUpImgBox>
              <Image source={require('../../../assets/images/SignupImg.png')} />
            </SignUpImgBox>
            <Step7BoxBottom>
              <Black16px>앤딩을 즐길 준비가 되셨나요?</Black16px>
              <LinktoLogin onPress={() => navigation.navigate('Login')}>
                <ButtonText>로그인 하기</ButtonText>
              </LinktoLogin>
            </Step7BoxBottom>
          </Step7Box>
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

const Step7Box = styled.View`
  padding: 47px;
`;

const Step7BoxBottom = styled.View`
  align-items: center;
  margin-top: 90px;
`;
const TitleText = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

const SubtitleText = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  margin-top: 70px;
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
  margin-top: 5px;
`;

const NextButton = styled(TouchableOpacity)`
  width: 306px;
  height: 44px;
  flex-shrink: 0;
  background-color: #ff7d7d;
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  margin-top: 50px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
`;

const GenderSelect = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const GenderButton = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? '#ff7d7d' : '#d9d9d9')};
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
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const LinktoLogin = styled(TouchableOpacity)`
  width: 306px;
  height: 44px;
  background-color: #ff7d7d;
  padding: 10px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
