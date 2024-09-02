import React, { useState } from 'react';
import { BlackLogo } from '../../../components/logo/Logo';
import { Black20px } from '../../../components/text/Text';
import Button from '../../../components/button/Button';
import LayoutContainer from '../../../layout/signuplayout/SignUpLayout';
import { Inputtext } from '../../../components/input/Input';

const SignUpEmail = ({}: { navigation: any }) => {
  const [text, setText] = useState('');

  return (
    <LayoutContainer>
      <LayoutContainer.TopLeft>
        <BlackLogo />
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
