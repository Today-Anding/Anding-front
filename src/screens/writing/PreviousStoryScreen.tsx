import React from 'react';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { White16px, Black14px } from '../../components/text/Text';

type RouteParams = {
  storyId: string;
  author: string;
};

function PreviousStoryScreen() {
  const route = useRoute();
  const { storyId } = route.params as RouteParams;

  return (
    <Container>
      <Header>
        <AndingTitle>별에서 온 그대</AndingTitle>
        <Title>{storyId}</Title>
      </Header>
      <Stroke />
      <StoryContent>
        <White16px>스토리 내용:</White16px>
        <Black14px>
          지훈과 수진은 대학 시절 처음 만났습니다. 그들은 같은 동아리에서
          활동하며 가까워졌고, 자연스럽게 서로에게 끌리게 되었습니다. 수진은
          그림을 그리는 것을 좋아했고, 지훈은 사진을 찍는 취미가 있었습니다.
          둘은 종종 캠퍼스 근처의 작은 공원에서 만나 수진이 스케치하는 모습을
          지훈이 사진으로 담곤 했습니다. 이 공원은 그들만의 특별한 장소가
          되었습니다. 졸업을 앞두고, 지훈은 해외로 유학을 떠날 기회를 얻게
          됩니다. 이는 그의 꿈을 이루기 위한 중요한 발판이었지만, 수진과의
          이별을 의미하기도 했습니다. 수진 역시 지훈을 응원하며 그의 결정을
          존중했지만, 이별의 순간이 다가올수록 마음이 무거워졌습니다. 출국 전날,
          지훈은 수진에게 작은 선물을 준비했습니다. 그것은 둘이 함께 찍은
          사진으로 만든 앨범이었습니다. 수진은 그 앨범을 받으며 눈물을 참지
          못했습니다. "지훈, 우리는 서로 떨어져 있어도 이 사진들이 우리를 이어줄
          거야. 절대 잊지 않을게." 지훈은 수진을 꼭 안아주며 속삭였습니다.
          "나도. 우리 다시 만날 거야. 그때까지 기다려줘." 지훈이 떠난 후, 수진은
          공허함을 느꼈습니다. 그는 지훈이 없는 일상에 익숙해지기 위해
          노력했지만, 여전히 지훈과의 추억이 떠올라 마음이 아팠습니다. 수진은
          지훈과의 추억을 일기장에 기록하며 마음을 달래곤 했습니다. 지훈과
          수진은 대학 시절 처음 만났습니다. 그들은 같은 동아리에서 활동하며
          가까워졌고, 자연스럽게 서로에게 끌리게 되었습니다. 수진은 그림을
          그리는 것을 좋아했고, 지훈은 사진을 찍는 취미가 있었습니다. 둘은 종종
          캠퍼스 근처의 작은 공원에서 만나 수진이 스케치하는 모습을 지훈이
          사진으로 담곤 했습니다. 이 공원은 그들만의 특별한 장소가 되었습니다.
          졸업을 앞두고, 지훈은 해외로 유학을 떠날 기회를 얻게 됩니다. 이는 그의
          꿈을 이루기 위한 중요한 발판이었지만, 수진과의 이별을 의미하기도
          했습니다. 수진 역시 지훈을 응원하며 그의 결정을 존중했지만, 이별의
          순간이 다가올수록 마음이 무거워졌습니다. 출국 전날, 지훈은 수진에게
          작은 선물을 준비했습니다. 그것은 둘이 함께 찍은 사진으로 만든
          앨범이었습니다. 수진은 그 앨범을 받으며 눈물을 참지 못했습니다. "지훈,
          우리는 서로 떨어져 있어도 이 사진들이 우리를 이어줄 거야. 절대 잊지
          않을게." 지훈은 수진을 꼭 안아주며 속삭였습니다. "나도. 우리 다시 만날
          거야. 그때까지 기다려줘." 지훈이 떠난 후, 수진은 공허함을 느꼈습니다.
          그는 지훈이 없는 일상에 익숙해지기 위해 노력했지만, 여전히 지훈과의
          추억이 떠올라 마음이 아팠습니다. 수진은 지훈과의 추억을 일기장에
          기록하며 마음을 달래곤 했습니다.
        </Black14px>
      </StoryContent>
      <Stroke />
    </Container>
  );
}

export default PreviousStoryScreen;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

const Header = styled.View`
  padding-top: 24px;
  padding-left: 24px;
`;

const Title = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 8px;
  font-style: normal;
  font-weight: 300;
`;

const AndingTitle = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  margin-bottom: 3px;
`;

const Stroke = styled.View`
  width: 343px;
  height: 1px;
  background: #ff9d9d;
  align-self: center;
  margin-top: 6px;
`;
const StoryContent = styled.ScrollView`
  max-height: 80%;
  padding: 0 22px 22px 22px;
`;
