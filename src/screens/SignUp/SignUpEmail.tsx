import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { BlackLogo } from '../../components/logo/Logo';
import { Black20px } from '../../components/text/Text';
import { Inputtext } from '../../components/input/Input';
import Button from '../../components/button/Button';
import LayoutContainer from '../../layout/signuplayout/SignUpLayout';

const SignUpEmail = ({ navigation }: { navigation: any }) => {
  const [text, setText] = useState('');

  return (
    <LayoutContainer>
      <LayoutContainer.TopLeft>
        <BlackLogo />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 10 }}
        >
          <Image
            source={require('../../assets/images/BackArrow.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </LayoutContainer.TopLeft>
      <LayoutContainer.Center>
        <Black20px>입력한 정보가 맞다면</Black20px>
        <Black20px>아래 확인 버튼을 눌러주세요</Black20px>
        <Inputtext
          label="이메일"
          value={text}
          onChangeText={(newText: React.SetStateAction<string>) =>
            setText(newText)
          }
        />
        <Button text="버튼" navigateTo={'SignUpEmail'} />
      </LayoutContainer.Center>
    </LayoutContainer>
  );
};

export default SignUpEmail;
