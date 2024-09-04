import React from 'react';
import styled from 'styled-components/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { WhiteLogo } from '../../components/logo/Logo';
import { White16px } from '../../components/text/Text';

type RootStackParamList = {
  StorySelect: undefined;
  StoryWriteCreate: undefined;
  StoryRoomSelect: { storyTitle: string }; // 새로운 파라미터 추가
};

const StoryRoomSelectScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRoomSelect = (roomSize: number) => {
    // 방 크기를 선택한 후 이동할 화면으로 라우팅
    navigation.navigate('StoryWriteCreate', { roomSize });
  };

  return (
    <Container>
      <StorySelectBackground>
        <WhiteLogo />
        <White16px>어떤 앤딩을 작성하고 싶으신가요?</White16px>
      </StorySelectBackground>
      <Title>방 크기를 선택하세요</Title>
      <ButtonContainer>
        <RoomButton onPress={() => handleRoomSelect(5)}>
          <RoomButtonText>5명 방</RoomButtonText>
        </RoomButton>
        <RoomButton onPress={() => handleRoomSelect(10)}>
          <RoomButtonText>10명 방</RoomButtonText>
        </RoomButton>
        <RoomButton onPress={() => handleRoomSelect(15)}>
          <RoomButtonText>15명 방</RoomButtonText>
        </RoomButton>
      </ButtonContainer>
    </Container>
  );
};

export default StoryRoomSelectScreen;

const Container = styled.View`
  flex: 1;
`;

const StorySelectBackground = styled.View`
  width: 100%;
  height: 30%;
  background: #ff7d7d;
  align-items: center;
  justify-content: center;
  z-index: -1;
  gap: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

const RoomButton = styled.TouchableOpacity`
  background-color: #ff9999;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  width: 80%;
  align-items: center;
`;

const RoomButtonText = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
`;
