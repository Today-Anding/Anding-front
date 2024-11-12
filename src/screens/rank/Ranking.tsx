import React, { useState } from 'react';
import styled from 'styled-components/native';
import { WhiteLogo } from '../../components/logo/Logo';
import SideNav from '../../components/sidenav/SideNav';
import { ImageSourcePropType, View } from 'react-native';
import {
  Black10pxMid,
  Black20px,
  Black24pxBold,
  Pink5px,
} from '../../components/text/Text';
import { List } from '../../components/list/List';
import SampleListImg1 from '../../assets/images/ListImg1.png';
import SampleListImg2 from '../../assets/images/ListImg2.png';
import SampleListImg3 from '../../assets/images/ListImg3.png';
import SampleListImg4 from '../../assets/images/ListImg4.png';
import ListImgWoman from '../../assets/images/ListWoman.png';
import ListImgman from '../../assets/images/ListMan.png';

interface RankingProps {}

const Ranking: React.FC<RankingProps> = () => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [selectedBox, setSelectedBox] = useState<'cumulative' | 'writer'>(
    'cumulative',
  );

  // 하드코딩된 데이터
  const cumulativeData = [
    {
      rank: 1,
      title: '꿀벌의 예언',
      likes: '좋아요 12개',
      endings: '앤딩작 5개',
      imageSource: SampleListImg1,
    },
    {
      rank: 2,
      title: '우리 안 사귀어!',
      likes: '좋아요 8개',
      endings: '앤딩작 5개',
      imageSource: SampleListImg2,
    },
    {
      rank: 3,
      title: '제국의 하인',
      likes: '좋아요 5개',
      endings: '앤딩작 5개',
      imageSource: SampleListImg3,
    },
    {
      rank: 4,
      title: '어느 마법사의 식당',
      likes: '좋아요 3개',
      endings: '앤딩작 5개',
      imageSource: SampleListImg4,
    },
  ];

  const writerData = [
    {
      rank: 1,
      title: '유경빈',
      likes: '좋아요 20개',
      endings: '앤딩작 10개',
      imageSource: ListImgWoman,
    },
    {
      rank: 2,
      title: '배채은',
      likes: '좋아요 17개',
      endings: '앤딩작 9개',
      imageSource: ListImgWoman,
    },
    {
      rank: 3,
      title: '김미희',
      likes: '좋아요 12개',
      endings: '앤딩작 5개',
      imageSource: ListImgWoman,
    },
    {
      rank: 4,
      title: '홍길동',
      likes: '좋아요 8개',
      endings: '앤딩작 3개',
      imageSource: ListImgman,
    },
  ];

  return (
    <RankingScreen>
      <RankingPinkBackground>
        <RankingHead>
          <WhiteLogo />
          <HamburgerButton onPress={() => setSidebarVisible(!sidebarVisible)}>
            <StyledImage
              source={require('../../assets/images/Hamburger.png')}
            />
          </HamburgerButton>
        </RankingHead>
        <BigWhiteBox>
          <BigWhiteBoxLeft>
            <Black20px>
              오늘의 <Black24pxBold>앤딩 랭킹</Black24pxBold>을
            </Black20px>
            <Black20px>확인하세요</Black20px>
            <SmallGray7>지금 핫한 앤딩을 만나보세요!</SmallGray7>
          </BigWhiteBoxLeft>
          <StyledImage source={require('../../assets/images/RankingImg.png')} />
        </BigWhiteBox>
        <SmallWhiteBox>
          <RowContainer onPress={() => setSelectedBox('cumulative')}>
            <StyledImage
              source={require('../../assets/images/CumulativeRankImg.png')}
            />
            <SmallWhiteBoxTextBox>
              <Pink5px>TODAY’S ANDING</Pink5px>
              <Black10pxMid>누적랭킹</Black10pxMid>
            </SmallWhiteBoxTextBox>
          </RowContainer>
          <StyledImage
            source={require('../../assets/images/SmallWhiteBoxStroke.png')}
          />
          <RowContainer onPress={() => setSelectedBox('writer')}>
            <StyledImage
              source={require('../../assets/images/WriterRankImg.png')}
            />
            <SmallWhiteBoxTextBox>
              <Pink5px>TODAY’S ANDING</Pink5px>
              <Black10pxMid>작가랭킹</Black10pxMid>
            </SmallWhiteBoxTextBox>
          </RowContainer>
        </SmallWhiteBox>
      </RankingPinkBackground>
      <SideNav
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        isLoggedIn={false}
        onLogout={() => console.log('Logout function')}
      />
      <ScrollViewContainer>
        <StyledScrollView>
          {selectedBox === 'cumulative' && (
            <View>
              <TextContent>누적 랭킹</TextContent>
              {cumulativeData.map(item => (
                <List
                  key={item.rank}
                  imageSource={item.imageSource as ImageSourcePropType}
                  rank={item.rank}
                  title={item.title}
                  likes={item.likes}
                  endings={item.endings}
                  onPress={() => console.log('List item pressed')}
                />
              ))}
            </View>
          )}
          {selectedBox === 'writer' && (
            <View>
              <TextContent>작가 랭킹</TextContent>
              {writerData.map(item => (
                <List
                  key={item.rank}
                  imageSource={item.imageSource as ImageSourcePropType}
                  rank={item.rank}
                  title={item.title}
                  likes={item.likes}
                  endings={item.endings}
                  onPress={() => console.log('List item pressed')}
                />
              ))}
            </View>
          )}
        </StyledScrollView>
      </ScrollViewContainer>
    </RankingScreen>
  );
};

export default Ranking;

const RankingScreen = styled.View`
  flex: 1;
  background-color: white;
`;

const RankingPinkBackground = styled.View`
  flex: 0.8;
  background: #ff7d7d;
  align-items: center;
`;

const RankingHead = styled.View`
  padding-top: 35px;
  padding-left: 100px;
  flex-direction: row;
  align-items: center;
`;

const HamburgerButton = styled.TouchableOpacity`
  margin-left: 100px;
`;

const BigWhiteBox = styled.View`
  width: 354px;
  height: 151px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #fff;
  margin-top: 30px;
  padding-left: 23px;
  padding-top: 26px;
  flex-direction: row;
`;

const BigWhiteBoxLeft = styled.View`
  padding-right: 25px;
`;

const SmallGray7 = styled.Text`
  color: #a3a3a3;
  font-family: 'Noto Sans KR';
  font-size: 10px;
  font-weight: 400;
  padding-top: 7px;
`;

const SmallWhiteBox = styled.View`
  width: 354px;
  height: 62px;
  border-radius: 15px;
  background: #fff;
  flex-direction: row;
  margin-top: 30px;
  align-items: center;
  padding: 9px;
  justify-content: center;
  gap: 30px;
`;

const RowContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const SmallWhiteBoxTextBox = styled.View`
  flex-direction: column;
  text-align: center;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;

const ScrollViewContainer = styled.View`
  flex: 1;
  padding-top: 7px;
  align-items: center;
`;

const TextContent = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 14px;
  padding-top: 7px;
`;

const StyledImage = styled.Image``;

const StyledScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 50,
  },
}))``;
