import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { WhiteLogo } from '../../components/logo/Logo';
import { White16px } from '../../components/text/Text';
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
};

const StorySelectScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const storyData: StoryItem[] = [
    { id: '1', title: '별', route: 'StoryRoomSelectScreen' },
    { id: '2', title: '별에', route: 'StoryRoomSelectScreen' },
    { id: '3', title: '별에서', route: 'StoryRoomSelectScreen' },
    { id: '4', title: '별에서 온', route: 'StoryRoomSelectScreen' },
    { id: '5', title: '별에서 온 그', route: 'StoryRoomSelectScreen' },
    { id: '6', title: '별에서 온 그대', route: 'StoryRoomSelectScreen' },
  ];

  const renderItem = ({ item }: { item: StoryItem }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(item.route as 'StoryRoomSelectScreen', {
            storyTitle: item.title,
          })
        }
        style={styles.touchableOpacity}
      >
        <StorySelectBox title={item.title} />
      </TouchableOpacity>
    );
  };

  return (
    <StorySelectScreenContainer>
      <StorySelectBackground
        colors={['#ff9999', '#ff4e4e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <WhiteLogo />
        <White16px>어떤 앤딩을 작성하고 싶으신가요?</White16px>
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

const StorySelectBackground = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: 30%;
  align-items: center;
  justify-content: center;
  z-index: -1;
`;

const ContentContainer = styled.View`
  flex: 0.8;
  align-items: center;
  margin-top: 200px;
  z-index: 1;
`;

const styles = StyleSheet.create({
  touchableOpacity: {
    width: '100%', // Ensure the TouchableOpacity takes up the width of the parent
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Add padding to make the touchable area larger
  },
});
