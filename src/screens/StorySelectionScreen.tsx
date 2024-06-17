import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {FlatList, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {WhiteLogo} from '../components/Logo';
import {White16px} from '../components/Text';
import StorySelectBox from '../components/StorySelectBox';

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
  flex: 0.7;
  align-items: center;
  margin-top: 180px;
  padding-top: 16px;
`;

type StoryItem = {
  id: string;
  title: string;
  route: keyof RootStackParamList;
};

type RootStackParamList = {
  StorySelect: undefined;
  StoryCreate: undefined;
};

const StorySelectScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const storyData: StoryItem[] = [
    {id: '1', title: '별에서 온 그대', route: 'StoryCreate'},
    {id: '2', title: '별에서 온 그대', route: 'StoryCreate'},
    {id: '3', title: '별에서 온 그대', route: 'StoryCreate'},
    {id: '4', title: '별에서 온 그대', route: 'StoryCreate'},
    {id: '5', title: '별에서 온 그대', route: 'StoryCreate'},
    {id: '6', title: '별에서 온 그대', route: 'StoryCreate'},
    {id: '7', title: '별에서 온 그대', route: 'StoryCreate'},
    {id: '8', title: '별에서 온 그대', route: 'StoryCreate'},
    {id: '9', title: '별에서 온 그대', route: 'StoryCreate'},
    {id: '10', title: '별에서 온 그대', route: 'StoryCreate'},
  ];

  const renderItem = ({item}: {item: StoryItem}) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
      <StorySelectBox title={item.title} />
    </TouchableOpacity>
  );

  return (
    <StorySelectScreenContainer>
      <StorySelectBackground
        colors={['#ff9999', '#ff4e4e']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <WhiteLogo />
        <White16px>어떤 앤딩을 작성하고 싶으신가요?</White16px>
      </StorySelectBackground>
      <ContentContainer>
        <FlatList
          data={storyData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 16}}
        />
      </ContentContainer>
    </StorySelectScreenContainer>
  );
};

export default StorySelectScreen;
