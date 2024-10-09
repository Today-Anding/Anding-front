import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import { WhiteLogo } from '../../components/logo/Logo';
import {
  Black10px,
  Black12px,
  Pink12px,
  White16px,
} from '../../components/text/Text';
import { Image } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

type RootStackParamList = {
  StorySelect: undefined;
  StoryWriteCreate: undefined;
  StoryRoomSelectScreen: { storyTitle: string; storyId: string };
  StoryTurnScreen: { roomSize: number; storyId: string; storyTitle: string };
};

type StoryRoomSelectScreenRouteProp = RouteProp<
  RootStackParamList,
  'StoryRoomSelectScreen'
>;

const StoryRoomSelectScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<StoryRoomSelectScreenRouteProp>();
  const { storyTitle, storyId } = route.params;

  const [roomCount5, setRoomCount5] = useState<number>(0);
  const [roomCount10, setRoomCount10] = useState<number>(0);
  const [roomCount15, setRoomCount15] = useState<number>(0);
  const apiUrl = Config.API_URL;

  useEffect(() => {
    const fetchRoomCount = async (roomSize: number) => {
      try {
        let response;
        if (roomSize === 5) {
          response = await axios.get(
            `${apiUrl}/api/v1/story5/countStory5/${storyId}`,
          );
          setRoomCount5(response.data['이어진 앤딩(글) 수']);
        } else if (roomSize === 10) {
          response = await axios.get(
            `${apiUrl}/api/v1/story10/countStory10/${storyId}`,
          );
          setRoomCount10(response.data['이어진 앤딩(글) 수']);
        } else if (roomSize === 15) {
          response = await axios.get(
            `${apiUrl}/api/v1/story15/countStory15/${storyId}`,
          );
          setRoomCount15(response.data['이어진 앤딩(글) 수']);
        }
      } catch (error) {}
    };

    [5, 10, 15].forEach(fetchRoomCount);
  }, [apiUrl, storyId]);

  const handleRoomSelect = (roomSize: number) => {
    navigation.navigate('StoryTurnScreen', { roomSize, storyId, storyTitle });
  };

  return (
    <Container>
      <StorySelectBackground>
        <WhiteLogo />
        <White16px>선택한 앤딩의 뒷 이야기를 작성해보아요</White16px>
        <StorySelectWhiteBox>
          <Image
            source={require('../../assets/images/StorySelectWriteImg.png')}
          />
          <TextContainer>
            <Black10px>
              <Black12px>5개, 10개, 15개</Black12px>의 이야기를 엮을 앤딩 중
              내가 작성할 앤딩을 골라보세요. 엮은 글의 개수 별로 다른 이야기가
              펼쳐지는 걸 확인해보세요!
            </Black10px>
          </TextContainer>
        </StorySelectWhiteBox>
      </StorySelectBackground>
      <ButtonContainer>
        <RoomButton onPress={() => handleRoomSelect(5)}>
          <Image source={require('../../assets/images/IsRoomTrue.png')} />
          <RoomButtonText>{storyTitle}</RoomButtonText>
          <RoomPeopleText>{roomCount5 + 1}/5</RoomPeopleText>
        </RoomButton>
        <RoomButton onPress={() => handleRoomSelect(10)}>
          <Image source={require('../../assets/images/IsRoomFalse.png')} />
          <RoomButtonText>{storyTitle}</RoomButtonText>
          <RoomPeopleText>{roomCount10 + 1}/10</RoomPeopleText>
        </RoomButton>
        <RoomButton onPress={() => handleRoomSelect(15)}>
          <Image source={require('../../assets/images/IsRoomFalse.png')} />
          <RoomButtonText>{storyTitle}</RoomButtonText>
          <RoomPeopleText>{roomCount15 + 1}/15</RoomPeopleText>
        </RoomButton>
      </ButtonContainer>
      <StoryTipContainer>
        <Black12px>앤딩 글 작성법에 대해 간략하게 알려드려요</Black12px>
        <StoryTipStroke />
        <StoryTipBox>
          <TipBox>
            <Black10px>
              <Pink12px>첫째, </Pink12px>시놉시스를 바탕으로 이야기를
              <TextSpan>구체화</TextSpan>하세요.
            </Black10px>
            <Black10px>
              이야기의 흐름과 캐릭터 설정을 미리 계획하면 글이 더
              매끄러워집니다.
            </Black10px>
          </TipBox>
          <TipBox>
            <Black10px>
              <Pink12px>둘째, </Pink12px>다른 사용자와 협업할 때는
              <TextSpan>일관성</TextSpan>을 유지하면서도
              <TextSpan>창의적인</TextSpan> 아이디어를 반영하세요.
            </Black10px>
            <Black10px>다양한 시각이 더 풍부한 이야기를 만듭니다.</Black10px>
          </TipBox>
          <TipBox>
            <Black10px>
              <Pink12px>셋째, </Pink12px>마지막 앤딩을 작성하는 사람은 이야기의{' '}
              <TextSpan>마무리</TextSpan>를 염두에 두고 써야 합니다.
            </Black10px>
            <Black10px>
              독자에게 만족스러운 결말을 제공해보고 앤딩왕이 될 기회를
              노려보세요.
            </Black10px>
          </TipBox>
        </StoryTipBox>
      </StoryTipContainer>
    </Container>
  );
};

export default StoryRoomSelectScreen;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
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

export const StorySelectWhiteBox = styled.View`
  width: 354px;
  height: 79px;
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

const ButtonContainer = styled.View`
  padding: 20px;
  align-items: center;
`;

const RoomButton = styled.TouchableOpacity`
  width: 335px;
  height: 63px;
  border-radius: 10px;
  border: 0.8px solid #ff9d9d;
  background: #fff;
  padding: 15px;
  margin-bottom: 12px;
  align-items: center;
  flex-direction: row;
`;

const RoomButtonText = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  margin-left: 13px;
`;

const RoomPeopleText = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  flex: 1;
  position: absolute;
  right: 21px;
`;

const StoryTipContainer = styled.View`
  align-items: left;
  padding-left: 29px;
  padding-top: 20px;
`;

const StoryTipStroke = styled.View`
  width: 284px;
  height: 0.5px;
  background: #ff9d9d;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StoryTipBox = styled.View`
  width: 352px;
`;

const TipBox = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TextSpan = styled.Text`
  font-weight: 700;
`;
