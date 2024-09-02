import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { WhiteLogo } from '../../components/logo/Logo';
import { White12px, White16px } from '../../components/text/Text';
import StoryCreateBox from '../../components/storycreatebox/StoryCreateBox';

const StoryCreationScreen: React.FC = () => {
  return (
    <StorySelectScreenContainer>
      <StorySelectBackground
        colors={['#ff9999', '#ff4e4e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <WhiteLogo />
        <White16px>당신의 앤딩을 작성해주세요.</White16px>
        <White12px>“별에서 온 그대”는 이렇게 끝났습니다.</White12px>
        <White12px>다음은 어떤 이야기일까요?</White12px>
      </StorySelectBackground>
      <StoryCreateBox title="앤딩" />
    </StorySelectScreenContainer>
  );
};

export default StoryCreationScreen;

const StorySelectScreenContainer = styled.View`
  flex: 1;
  background-color: white;
  gap: 16px;
  align-items: center;
`;

const StorySelectBackground = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 30%;
  align-items: center;
  justify-content: center;
  z-index: -1;
  gap: 16px;
`;
