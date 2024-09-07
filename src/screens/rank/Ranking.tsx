import React, { useState } from 'react';
import styled from 'styled-components/native';
import { WhiteLogo } from '../../components/logo/Logo';
import SideNav from '../../components/sidenav/SideNav';
import { Image, TouchableOpacity, ScrollView, View } from 'react-native';
import { Black20px, Black24px } from '../../components/text/Text';
import { List } from '../../components/list/List';
import SampleListImg from '../../assets/images/SampleListImg.png';

function Ranking() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedBox, setSelectedBox] = useState('cumulative');

  return (
    <RankingScreen>
      <RankingPinkBackground>
        <WhiteLogo />
        <HamburgerButton onPress={() => setSidebarVisible(!sidebarVisible)}>
          <Image
            source={require('../../assets/images/Hamburger.png')}
            style={{ width: 24, height: 24 }}
          />
        </HamburgerButton>
        <BigWhiteBox>
          <Black20px>
            오늘의 <Black24px>앤딩 랭킹</Black24px>을
          </Black20px>
          <Black20px>확인하세요</Black20px>
          <SmallGray7>지금 핫한 앤딩을 만나보세요!</SmallGray7>
          <Image source={require('../../assets/images/RankingImg.png')} />
        </BigWhiteBox>
        <SmallWhiteBox>
          <TouchableOpacity onPress={() => setSelectedBox('cumulative')}>
            <Image
              source={require('../../assets/images/CumulativeRankImg.png')}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/SmallWhiteBoxStroke.png')}
          />
          <TouchableOpacity onPress={() => setSelectedBox('writer')}>
            <Image source={require('../../assets/images/WriterRankImg.png')} />
          </TouchableOpacity>
        </SmallWhiteBox>
      </RankingPinkBackground>
      <SideNav
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
      <ScrollViewContainer>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {selectedBox === 'cumulative' && (
            <View>
              <TextContent>누적 랭킹이 여기에 표시됩니다.</TextContent>
              {[...Array(10)].map((_, i) => (
                <List
                  key={i}
                  imageSource={SampleListImg}
                  rank={i + 1}
                  title="별에서 온 그대"
                  likes="좋아요 1.5K"
                  endings="앤딩작 10개"
                  onPress={() => console.log('List item pressed')}
                />
              ))}
            </View>
          )}
          {selectedBox === 'writer' && (
            <View>
              <TextContent>작가 랭킹이 여기에 표시됩니다.</TextContent>
              {[...Array(10)].map((_, i) => (
                <List
                  key={i}
                  imageSource={SampleListImg}
                  rank={i + 1}
                  title="별에서 온 그대"
                  likes="좋아요 1.5K"
                  endings="앤딩작 10개"
                  onPress={() => console.log('List item pressed')}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </ScrollViewContainer>
    </RankingScreen>
  );
}

export default Ranking;

const RankingScreen = styled.View`
  flex: 1;
  background-color: white;
`;

const RankingPinkBackground = styled.View`
  flex: 0.5;
  background: #ff7d7d;
  align-items: center;
`;

const HamburgerButton = styled.TouchableOpacity``;

const BigWhiteBox = styled.View`
  width: 354px;
  height: 151px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #fff;
`;

const SmallGray7 = styled.Text`
  color: #a3a3a3;
  font-family: 'Noto Sans KR';
  font-size: 7px;
  font-style: normal;
  font-weight: 400;
`;

const SmallWhiteBox = styled.View`
  width: 354px;
  height: 62px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #fff;
  gap: 10px;
  flex-direction: row;
`;

const ScrollViewContainer = styled.View`
  flex: 1;
`;

const TextContent = styled.Text`
  font-size: 16px;
  color: #000;
`;
