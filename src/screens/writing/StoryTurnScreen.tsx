import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Alert } from 'react-native';
import styled from 'styled-components/native';
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import { WhiteLogo } from '../../components/logo/Logo';
import { Black10px, Black12px, White16px } from '../../components/text/Text';
import axios from 'axios';
import Config from 'react-native-config';

type RootStackParamList = {
  PreviousStoryScreen: {
    content: string | null;
    storyId: string;
    position: number;
    storyTitle: string;
  };
  StoryTurnScreen: { roomSize: number; storyId: string; storyTitle: string };
  StoryWriteCreate: {
    roomSize: number;
    storyId: string;
    storyTitle: string;
  };
};

interface Story {
  content: string;
  author: string;
  message: string | null;
  story_id: number;
}

type StoryTurnScreenRouteProp = RouteProp<
  RootStackParamList,
  'StoryTurnScreen'
>;

function StoryTurnScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<StoryTurnScreenRouteProp>();
  const { roomSize, storyId, storyTitle } = route.params;
  const [stories, setStories] = useState<Story[]>([]);
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const apiUrl = Config.API_URL;
    const getStoryEndpoint = `${apiUrl}/api/v1/story${roomSize}/incomplete/${storyId}`;

    const fetchStories = async () => {
      try {
        const response = await axios.get(getStoryEndpoint);
        const validStories = Array.isArray(response.data.items)
          ? response.data.items
          : [];
        setStories(validStories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, [slideAnim, roomSize, storyId]);

  const fetchStoryContent = async (storyId: string, position: number) => {
    try {
      const apiUrl = Config.API_URL;
      const response = await axios.get(
        `${apiUrl}/api/v1/story${roomSize}/getStory${roomSize}/${storyId}/${position}`,
      );
      console.log('API Response:', response.data);
      return response.data.content;
    } catch (error) {
      console.error('Error fetching story content:', error);
      return null;
    }
  };

  const fetchStoryDescription = async (storyId: string) => {
    try {
      const apiUrl = Config.API_URL;
      let endpoint = '';

      if (roomSize === 5) {
        endpoint = `${apiUrl}/api/v1/five/getFive/${storyId}`;
      } else if (roomSize === 10) {
        endpoint = `${apiUrl}/api/v1/ten/getTen/${storyId}`;
      } else if (roomSize === 15) {
        endpoint = `${apiUrl}/api/v1/fifteen/getFifteen/${storyId}`;
      }

      const response = await axios.get(endpoint);
      return response.data.description;
    } catch (error) {
      console.error('Error fetching story description:', error);
      return null;
    }
  };

  const navigateToPreviousStoryScreen = (
    content: string | null,
    storyId: string,
    position: number,
    storyTitle: string,
  ) => {
    if (content !== null) {
      navigation.navigate('PreviousStoryScreen', {
        content,
        storyId,
        position,
        storyTitle,
      });
    }
  };

  const handleDescriptionButtonPress = async (
    storyId: string,
    position: number,
  ) => {
    const content = await fetchStoryDescription(storyId);
    navigateToPreviousStoryScreen(content, storyId, position, storyTitle);
  };

  const handleTurnButtonPress = async (storyId: string, position: number) => {
    const content = await fetchStoryContent(storyId, position);
    navigateToPreviousStoryScreen(content, storyId, position, storyTitle);
  };

  const handleAddStory = () => {
    navigation.navigate('StoryWriteCreate', {
      roomSize: roomSize,
      storyId: storyId,
      storyTitle: storyTitle,
    });
  };

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
            <Black12px>이어지는 이야기를 새롭게 만들어보세요!</Black12px>
          </TextContainer>
        </StorySelectWhiteBox>
      </StorySelectBackground>
      <TurnBoxContainer>
        <TurnBox>
          {stories.length > 0 ? (
            stories.map((story, index) => (
              <TurnButton
                key={story.story_id}
                onPress={() => handleDescriptionButtonPress(storyId, index + 1)}
              >
                <Black12px>{`${index + 1}번째 앤딩`}</Black12px>
                <TurnButtonStroke />
                <Black10px>시놉시스</Black10px>
              </TurnButton>
            ))
          ) : (
            <></>
          )}
        </TurnBox>
        <TurnBox>
          {stories.length > 0 ? (
            stories.map((story, index) => (
              <TurnButton
                key={story.story_id}
                onPress={() => handleTurnButtonPress(storyId, index + 1)}
              >
                <Black12px>{`${index + 2}번째 앤딩`}</Black12px>
                <TurnButtonStroke />
                <Black10px>{`작가: ${story.author}`}</Black10px>
              </TurnButton>
            ))
          ) : (
            <Black10px>완료된 앤딩입니다.</Black10px>
          )}
        </TurnBox>
      </TurnBoxContainer>
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
  height: 35%;
  background: #ff7d7d;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 30px;
`;

const StorySelectWhiteBox = styled.View`
  width: 354px;
  min-height: 79px;
  border-radius: 15px;
  background: #fff;
  flex-direction: row;
  align-items: center;
  padding: 14px;
  margin-top: 10px;
`;

const TextContainer = styled.View`
  width: 272px;
  padding-right: 30px;
  margin-left: 10px;
`;

const TurnBoxContainer = styled.View`
  padding-top: 49px;
`;
const TurnBox = styled.View`
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
