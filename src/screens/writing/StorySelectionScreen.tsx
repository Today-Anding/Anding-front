import React from 'react';
import styled from 'styled-components/native';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { WhiteLogo } from '../../components/logo/Logo';
import { White12px, White16px } from '../../components/text/Text';
import StorySelectBox from '../../components/storyselectbox/StorySelectBox';

type StoryItem = {
  id: string;
  title: string;
  route: keyof RootStackParamList;
};

type RootStackParamList = {
  StorySelect: undefined;
  StoryWriteCreate: { roomSize: number };
  StoryRoomSelectScreen: { storyTitle: string };
  // 추가적인 라우트가 필요하면 여기에 정의
};

const StorySelectScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const storyData: StoryItem[] = [
    { id: '1', title: '기생충', route: 'StoryRoomSelectScreen' },
    { id: '2', title: '올드보이', route: 'StoryRoomSelectScreen' },
    { id: '3', title: '명량', route: 'StoryRoomSelectScreen' },
    { id: '4', title: '부산행', route: 'StoryRoomSelectScreen' },
    { id: '5', title: '곡성', route: 'StoryRoomSelectScreen' },
    { id: '6', title: '도깨비', route: 'StoryRoomSelectScreen' },
    { id: '7', title: '미스터 션샤인', route: 'StoryRoomSelectScreen' },
    { id: '8', title: '이태원 클라쓰', route: 'StoryRoomSelectScreen' },
    { id: '9', title: '사랑의 불시착', route: 'StoryRoomSelectScreen' },
    { id: '10', title: '스카이 캐슬', route: 'StoryRoomSelectScreen' },
  ];

  const renderItem = ({ item }: { item: StoryItem }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.route, {
            storyTitle: item.title,
            storyId: item.id, 
          });
        }}
        style={styles.touchableOpacity}
      >
        <StorySelectBox title={item.title} />
      </TouchableOpacity>
    );
  };

  return (
    <StorySelectScreenContainer>
      <StorySelectBackground>
        <WhiteLogo />
        <White16px>어떤 앤딩을 작성하고 싶으신가요?</White16px>
        <White12px>쓰고 싶은 앤딩을 골라 소설 작가에 도전해보세요</White12px>
      </StorySelectBackground>
      <ContentContainer>
        <FlatList
          data={storyData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ContentContainer>
    </StorySelectScreenContainer>
  );
};

export default StorySelectScreen;

const StorySelectScreenContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const StorySelectBackground = styled.View`
  position: absolute;
  background: #ff7d7d;
  width: 100%;
  height: 30%;
  align-items: center;
  justify-content: center;
  z-index: -1;
  gap: 10px;
`;

const ContentContainer = styled.View`
  flex: 0.8;
  align-items: center;
  margin-top: 200px;
  z-index: 1;
`;

const styles = StyleSheet.create({
  touchableOpacity: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
