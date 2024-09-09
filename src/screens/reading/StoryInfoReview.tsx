import React from 'react';
import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Black16px, Black12px } from '../../components/text/Text';
import SampleListImg from '../../assets/images/SampleListImg.png';

// 네비게이션 타입 정의
type RootStackParamList = {
  StoryInfoReview: { title: string };
};

// RouteProp 타입 정의
type StoryInfoReviewRouteProp = RouteProp<
  RootStackParamList,
  'StoryInfoReview'
>;

const dummyData = {
  genre: '로맨스',
  title: '별에서 온 그대',
  author: '작가 김하늘',
  summary:
    '별에서 온 그대는 외계인과 인간의 사랑을 다룬 이야기로, 우주와 지구를 배경으로 한 아름다운 로맨스를 그립니다. 다양한 갈등과 감동적인 순간들이 어우러져 독자들에게 큰 사랑을 받고 있습니다.',
  tags: ['로맨스', '외계인', '사랑'],
};

function StoryInfoReview() {
  const route = useRoute<StoryInfoReviewRouteProp>();
  const { title } = route.params;

  return (
    <ScrollContainer>
      <View style={styles.container}>
        <TitleContainer>
          <Black16px>{dummyData.title}</Black16px>
          <Black12px>{`장르: ${dummyData.genre}`}</Black12px>
          <Black12px>{`작가: ${dummyData.author}`}</Black12px>
        </TitleContainer>
        <SummaryContainer>
          <Black12px>줄거리:</Black12px>
          <SummaryText>{dummyData.summary}</SummaryText>
        </SummaryContainer>
        <TagsContainer>
          <Black12px>태그:</Black12px>
          <TagText>{dummyData.tags.join(', ')}</TagText>
        </TagsContainer>
        <ReviewContainer>
          <Black12px>리뷰 작성:</Black12px>
          <ReviewInput placeholder="여기에 리뷰를 작성해 주세요" multiline />
        </ReviewContainer>
      </View>
    </ScrollContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

const ScrollContainer = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;

const TitleContainer = styled.View`
  margin-bottom: 16px;
`;

const SummaryContainer = styled.View`
  margin-bottom: 16px;
`;

const SummaryText = styled.Text`
  font-size: 12px;
  line-height: 18px;
`;

const TagsContainer = styled.View`
  margin-bottom: 16px;
`;

const TagText = styled.Text`
  font-size: 12px;
`;

const ReviewContainer = styled.View``;

const ReviewInput = styled(TextInput)`
  height: 100px;
  border-width: 1px;
  border-color: #ccc;
  padding: 8px;
  font-size: 12px;
`;

export default StoryInfoReview;
