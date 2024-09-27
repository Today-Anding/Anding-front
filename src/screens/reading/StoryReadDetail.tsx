import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Black12px, Black16px } from '../../components/text/Text';
import GobackButton from '../../components/button/GobackButton';
import styled from 'styled-components/native';
import Config from 'react-native-config';

// 네비게이션 스택 타입 정의
export type RootStackParamList = {
  StoryReadCategory: undefined;
  StoryReadDetail: {
    title: string;
    five_id?: number;
    ten_id?: number;
    fifteen_id?: number;
  };
};

// 루트 스택에서 StoryReadDetail 경로의 RouteProp 타입 정의
type DetailPageRouteProp = RouteProp<RootStackParamList, 'StoryReadDetail'>;

type StoryDetail = {
  story_id: number;
  content: string;
  author: string;
};

function StoryReadDetail() {
  const route = useRoute<DetailPageRouteProp>();
  const { title, five_id, ten_id, fifteen_id } = route.params;

  const [storyDetails, setStoryDetails] = useState<StoryDetail[]>([]); // API로 받아온 데이터를 저장할 상태

  const apiUrl = Config.API_URL;

  // 데이터 가져오는 함수
  const fetchStoryDetails = async () => {
    try {
      console.log('API URL:', apiUrl); // URL 확인
      let endpoint = '';
      if (five_id) {
        endpoint = `${apiUrl}/api/v1/story5/completed/${five_id}`;
      } else if (ten_id) {
        endpoint = `${apiUrl}/api/v1/story10/completed/${ten_id}`;
      } else if (fifteen_id) {
        endpoint = `${apiUrl}/api/v1/story15/completed/${fifteen_id}`;
      }

      if (!endpoint) {
        throw new Error('Invalid ID for fetching story details.');
      }

      const response = await axios.get(endpoint);
      setStoryDetails(response.data.items); // 받은 데이터를 상태에 저장
    } catch (error) {
      console.error('Error fetching story details:', error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터를 가져옴
  useEffect(() => {
    fetchStoryDetails();
  }, []);

  return (
    <ScrollContainer>
      <Container>
        <HeaderContainer>
          <Black16px>{`'${title}'의 앤딩입니다.`}</Black16px>
          <GobackButton />
        </HeaderContainer>
        {storyDetails.map((story, index) => (
          <View key={index}>
            <TurnContainer>
              <Line />
              <TextContainer>
                <TurnText>{`앤딩 ${index + 1}`}</TurnText>
                <Black12px>{story.author}</Black12px>
              </TextContainer>
              <Line />
            </TurnContainer>
            <ContentText>{story.content}</ContentText>
          </View>
        ))}
      </Container>
    </ScrollContainer>
  );
}

// styled-components
const ScrollContainer = styled(ScrollView)`
  flex-grow: 1;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  padding-bottom: 50px;
`;

const HeaderContainer = styled.View`
  padding-top: 10px;
  padding-left: 17px;
  flex-direction: row;
  align-items: center;
  gap: 150px;
`;

const TurnContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const TextContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Line = styled.View`
  width: 124px;
  height: 1px;
  background-color: #ff7d7d;
`;

const TurnText = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 13px;
  font-style: normal;
  font-weight: 100;
  margin-top: 10px;
`;

const ContentText = styled.Text`
  font-size: 12px;
  line-height: 18px;
  padding: 27px;
`;

export default StoryReadDetail;
