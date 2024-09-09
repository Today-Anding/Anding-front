import React from 'react';
import { ScrollView, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Black12px, Black16px } from '../../components/text/Text';
import GobackButton from '../../components/button/GobackButton';
import styled from 'styled-components/native';

// 네비게이션 스택 타입 정의
export type RootStackParamList = {
  StoryReadCategory: undefined;
  StoryReadDetail: { title: string };
};

// 루트 스택에서 StoryReadDetail 경로의 RouteProp 타입 정의
type DetailPageRouteProp = RouteProp<RootStackParamList, 'StoryReadDetail'>;

const stories = [
  {
    title: '첫번째 이야기',
    author: '작가 김하늘',
    content:
      '수진이 과거에 남은 지 몇 년이 흐르고, 과거는 예상치 못한 방향으로 흘러가며 더 나은 미래를 만들어냅니다. 그동안 지훈은 수진과의 기억을 떠올리며 그녀를 그리워하고, 둘 사이의 이야기가 풀리는 과정에서 숨겨진 진실들이 드러나게 됩니다. 이 모든 상황 속에서 지훈은 과거의 상처를 치유하고 새로운 희망을 찾아 나가게 됩니다.',
  },
  {
    title: '두번째 이야기',
    author: '작가 이수민',
    content:
      '지훈은 결국 수진과의 재회를 꿈꾸며, 그녀가 남긴 흔적을 찾아나서기 시작합니다. 과거의 기억들이 현재에 영향을 미치면서 새로운 갈등이 일어납니다. 지훈은 과거의 상처를 감추고 싶지만, 과거의 사건들이 현재와 연결되면서 그를 더욱 혼란스럽게 만듭니다. 그는 모든 문제를 해결하고 과거를 극복하기 위해 애쓰게 됩니다.',
  },
  {
    title: '세번째 이야기',
    author: '작가 박지연',
    content:
      '시간이 지나며 지훈은 과거를 극복하고자 하지만, 그를 뒤흔드는 사건들이 계속해서 일어납니다. 미래로 나아가기 위한 선택의 기로에 서게 되며, 새로운 시련과 마주하게 됩니다. 그의 결단이 미래를 어떻게 변화시킬지, 그리고 그가 어떤 선택을 하게 될지 지켜보는 것이 중요한 순간이 됩니다.',
  },
  {
    title: '네번째 이야기',
    author: '작가 정민아',
    content:
      '지훈은 과거의 미련을 버리고 새로운 사람을 만나며 현재의 행복을 찾아가지만, 수진의 기억은 여전히 그를 괴롭히고 있습니다. 새로운 사람과의 관계 속에서도 과거의 그림자가 여전히 그를 괴롭히며, 그가 어떻게 과거를 극복하고 현재의 행복을 찾을 수 있을지에 대한 고민이 이어집니다.',
  },
  {
    title: '다섯번째 이야기',
    author: '작가 이승호',
    content:
      '마지막으로, 지훈은 수진과의 기억을 마음속에 간직한 채 완전한 새로운 시작을 다짐합니다. 그는 이제 미래를 향해 나아가고자 하며, 새로운 목표와 꿈을 가지고 새로운 삶을 시작하게 됩니다. 이 과정에서 그가 마주하는 도전과 성장, 그리고 그가 이룩하는 성공의 이야기가 중요한 부분을 차지합니다.',
  },
];

function StoryReadDetail() {
  const route = useRoute<DetailPageRouteProp>();
  const { title } = route.params;

  return (
    <ScrollContainer>
      <Container>
        <HeaderContainer>
          <Black16px>{`'${title}'의 앤딩입니다.`}</Black16px>
          <GobackButton />
        </HeaderContainer>
        {stories.map((story, index) => (
          <View>
            <TurnContainer key={index}>
              <Line />
              <TextContainer>
                <TurnText>{story.title}</TurnText>
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
