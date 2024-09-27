import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { Black14px, White16px } from '../../components/text/Text';

type RouteParams = {
  content: string | null;
  storyId: string;
  position: number;
};

interface Story {
  story_id: number;
  content: string;
  author: string;
  message: string | null;
}

function PreviousStoryScreen() {
  const route = useRoute();
  const { content, storyId, position } = route.params as RouteParams;
  const { content: initialContent } = route.params as RouteParams;
  const [storyTitle, setStoryTitle] = useState<string | null>(null);
  const [storyContent, setStoryContent] = useState<string | null>(
    initialContent,
  );

  return (
    <Container>
      <Header>
        <AndingTitle>{storyTitle}</AndingTitle>
      </Header>
      <Stroke />
      <StoryContent>
        <White16px>스토리 내용:</White16px>
        {storyContent ? (
          <Black14px>{storyContent}</Black14px>
        ) : (
          <Black14px>Loading...</Black14px>
        )}
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
