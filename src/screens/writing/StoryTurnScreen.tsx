import React, { useRef, useEffect } from 'react';
import { Animated, Image } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { WhiteLogo } from '../../components/logo/Logo';
import { Black10px, Black12px, White16px } from '../../components/text/Text';

type RootStackParamList = {
  PreviousStoryScreen: { storyId: string }; // 네비게이션에 필요한 파라미터
};

function StoryTurnScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // 애니메이션 값 초기화
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    // 애니메이션 실행
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000, // 애니메이션 시간 (1000ms = 1초)
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleTurnButtonPress = (storyId: string) => {
    // 'StoryDetail' 화면으로 이동
    navigation.navigate('PreviousStoryScreen', { storyId });
  };

  const handleAddStory = () => {
    // 'StoryWriteCreate' 화면으로 이동
    navigation.navigate('StoryWriteCreate');
  };

  // 애니메이션 스타일 생성
  const animatedStyle = {
    transform: [{ translateY: slideAnim }],
  };

  return (
    <Container>
      <StorySelectBackground>
        <WhiteLogo />
        <White16px>선택한 앤딩의 뒷 이야기를 작성해보아요</White16px>
        <StorySelectWhiteBox>
          <Image source={require('../../assets/images/StoryTurnImg.png')} />
          <TextContainer>
            <Black12px>앞의 앤딩들을 읽어보고,</Black12px>
            <Black12px> 이어지는 이야기를 새롭게 만들어보세요!</Black12px>
          </TextContainer>
        </StorySelectWhiteBox>
      </StorySelectBackground>
      <TurnBox>
        <TurnButton onPress={() => handleTurnButtonPress('1번째 이야기')}>
          <Black12px>첫번째 앤딩</Black12px>
          <TurnButtonStroke />
          <Black10px>시놉시스</Black10px>
        </TurnButton>
        <TurnButton onPress={() => handleTurnButtonPress('2번째 이야기')}>
          <Black12px>두번째 앤딩</Black12px>
          <TurnButtonStroke />
          <Black10px>작가 : 김미희</Black10px>
        </TurnButton>
        <TurnButton onPress={() => handleTurnButtonPress('3번째 이야기')}>
          <Black12px>세번째 앤딩</Black12px>
          <TurnButtonStroke />
          <Black10px>작가 : 유경빈</Black10px>
        </TurnButton>
      </TurnBox>
      <AddStoryContainer style={animatedStyle}>
        <AddStoryText>
          <Black10px>더하기 버튼을 눌러서</Black10px>
          <Black10px>연결되는 뒷 이야기를 작성해 보아요</Black10px>
        </AddStoryText>
        <AddStoryButton onPress={handleAddStory}>
          <PlusIcon
            source={require('../../assets/images/plusicon.png')}
            style={{ width: 10, height: 10 }}
          />
        </AddStoryButton>
      </AddStoryContainer>
    </Container>
  );
}

export default StoryTurnScreen;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const StorySelectBackground = styled.View`
  width: 100%;
  height: 40%;
  background: #ff7d7d;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const StorySelectWhiteBox = styled.View`
  width: 354px;
  min-height: 79px;
  border-radius: 15px;
  background: #fff;
  flex-direction: row;
  align-items: center;
  padding: 14px;
`;

const TextContainer = styled.View`
  width: 272px;
  padding-right: 30px;
  margin-left: 10px;
`;

const TurnBox = styled.View`
  padding-top: 49px;
  align-items: center;
`;

const TurnButton = styled.TouchableOpacity`
  width: 335px;
  height: 63px;
  border-radius: 10px;
  border: 0.8px solid #ff9d9d;
  background: #fff;
  padding: 15px;
  margin-bottom: 13px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const TurnButtonStroke = styled.View`
  width: 229px;
  height: 1px;
  background-color: #fcc;
  margin: 5px;
`;

const AddStoryContainer = styled(Animated.View)`
  position: absolute;
  bottom: 80px;
  left: 170px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 10px;
`;

const AddStoryText = styled.View`
  width: 176px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #fcc;
  background: #fee;
  padding: 5px;
`;

const AddStoryButton = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  border-radius: 30px;
  background-color: #ffcccc;
  align-items: center;
  justify-content: center;
`;

const PlusIcon = styled.Image`
  width: 30px;
  height: 30px;
`;
